import { promises as fs, constants } from "fs";
import path from "path";
import { createLogger } from "./logger";
import { used } from "windows-drive-letters";
import { asHook } from "./util";

export type FolderEntry = {
    name: string;
    path: string;
};

export type PathEntry = FolderEntry & {
    tags: string[];
    isFile: boolean;
};

export type GetFilesOptions = {
    root: string;
    current: string;
    showDescendants: boolean;
    filters: string[];
    refetch: Date;
    tagColorMap: Map<string, string>;
    prefix?: string;
};

const LOG = createLogger("files");

// TODO File IO should probably be done in the main thread to not block the UI updates (?)

// Split a filename into its "base" part (without tags) and the tags itself
// and returns then [base, ext, tags[]]
export const splitFilename = (filename: string): [string, string, string[]] => {
    let tags: string[] = [];
    const ext = path.extname(filename);
    let name = filename.replace(ext, "");

    const matchTags = /\[([^\]]*)]/.exec(name);
    if (matchTags) {
        tags = matchTags[1].split(" ").sort();
        name = name.replace(matchTags[0], "");
    }

    return [name, ext, tags];
};

// Finds all files under a given root (which is always relative to the db.root)
export const getFiles = async(opts: GetFilesOptions): Promise<PathEntry[]> => {
    const {
        root,
        current,
        showDescendants,
        filters,
        tagColorMap,
        refetch,
        prefix = "",
    } = opts;

    // Resolve the given root to be a relative folder under root
    const folder = path.resolve(path.join(root, current));
    const dirents = await fs.readdir(folder, { withFileTypes: true });

    const promises = dirents.map(async dirent => {
        const absolutePath = path.join(folder, dirent.name);

        const entry: PathEntry = {
            name: prefix + dirent.name,
            tags: [],
            isFile: dirent.isFile(),
            path: absolutePath,
        };

        LOG.silly("Creating PathEntry for %s", absolutePath);

        if (dirent.isDirectory()) {
            if (showDescendants) {
                const relativePath = path.relative(root, absolutePath);
                return getFiles({
                    root,
                    current: relativePath,
                    showDescendants,
                    filters,
                    refetch,
                    tagColorMap,
                    prefix: relativePath + path.sep,
                });
            }

            return [entry];
        }

        const [name, ext, tags] = splitFilename(entry.name);
        entry.name = name + ext;
        entry.tags = tags.map(tag => tag + "#" + (tagColorMap.get(tag) || ""));
        
        let matchesFilter = false;
        filters.forEach(filter => {
            matchesFilter = matchesFilter || entry.tags.indexOf(filter) !== -1;
        });

        if (matchesFilter || !dirent.isFile || filters.length === 0) {
            return [entry];
        }

        return [];
    });

    const resolved = await Promise.all(promises);
    const entries: PathEntry[] = Array.prototype.concat(...resolved);

    if (!showDescendants) {
        entries.unshift({
            name: "..",
            isFile: false,
            path: path.resolve(folder, ".."),
            tags: [],
        });
    }

    return entries;
};

export const useGetFiles = (opts: GetFilesOptions) => asHook(getFiles, opts);

// Fetch all folders under a given root
export const getFolders = async(root: string): Promise<FolderEntry[]> => {
    let dirs: FolderEntry[] = [];

    if (root === "/" && process.platform === "win32") {
        LOG.debug("Searching for drive letters");

        const letters = await used();
        await Promise.all(letters.map(async letter => {
            try {
                await fs.access(letter + ":", constants.R_OK);

                dirs.push({
                    name: letter + ":",
                    path: letter + ":" + path.sep
                });
            } catch (e) {
                LOG.debug("Skipping drive %s because it's unreadable", letter);
            }
        }));
    } else {
        LOG.debug("Reading dir %s", root);

        const dirents = await fs.readdir(root, { withFileTypes: true });

        dirs = dirents.filter(dirent => dirent.isDirectory())
            .map(dirent => ({
                name: dirent.name,
                path: path.join(root, dirent.name)
            }));

        LOG.debug("Found %i subdirs", dirs.length);

        // Add a "back to root" option for windows to get back to the drive selection
        if (/^[a-z]:\\$/i.test(root) && process.platform === "win32") {
            dirs.unshift({
                name: "Select different drive",
                path: "/",
            });
        } else {
            dirs.unshift({
                name: "..",
                path: path.resolve(root, "..")
            });
        }
    }

    return dirs;
};

export const useGetFolders = (current: string) => asHook(getFolders, current);

// Add a tag to a file
export const addTagToFile = async(name: string, filePath: string) => {
    const [filename, ext, tags] = splitFilename(filePath);
    tags.push(name);

    const newName = filename + "[" + tags.join(" ") + "]" + ext;

    const dir = path.basename(filePath);
    return fs.rename(filePath, path.resolve(dir, newName));
};

// Remove a tag from a file
export const removeTag = async(name: string, filePath: string) => {
    const [filename, ext, tags] = splitFilename(filePath);
    const newTags = tags.splice(tags.indexOf(name), 1);

    let newName = filename;

    if (newTags.length > 0) {
        newName += "[" + tags.join(" ") + "]";
    }

    newName += ext;

    const dir = path.basename(filePath);
    return fs.rename(filePath, path.resolve(dir, newName))
};
