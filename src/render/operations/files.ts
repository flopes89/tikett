import * as fs from "fs-extra";
import path from "path";
import { createLogger } from "../logger";
import { used } from "windows-drive-letters";
import { asHook } from "../util";
import { constants } from "fs-extra";

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
    prefix?: string;
};

const LOG = createLogger("files");

// TODO File IO should probably be done in the main thread to not block the UI updates (?)

// Split a filename into its "base" part (path + name without tags), its extension and the tags itself
// and returns then [basePath, ext, tags[]]
export const splitFilename = (filePath: string): [string, string, string[]] => {
    let tags: string[] = [];
    const ext = path.extname(filePath);
    let name = filePath.replace(ext, "");

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
        refetch,
        prefix = "",
    } = opts;

    // Resolve the given root to be a relative folder under root
    const folder = path.resolve(path.join(root, current));
    const dirents = await fs.readdir(folder);

    const promises = dirents.map(async dirent => {
        try {
            const absolutePath = path.join(folder, dirent);
            const stats = await fs.stat(absolutePath);

            const entry: PathEntry = {
                name: prefix + dirent,
                tags: [],
                isFile: stats.isFile(),
                path: absolutePath,
            };

            LOG.silly("Creating PathEntry for %s", absolutePath);

            if (stats.isDirectory()) {
                if (showDescendants) {
                    const relativePath = path.relative(root, absolutePath);
                    return getFiles({
                        root,
                        current: relativePath,
                        showDescendants,
                        filters,
                        refetch,
                        prefix: relativePath + path.sep,
                    });
                }

                return [entry];
            }

            const [filePath, ext, tags] = splitFilename(entry.name);
            entry.name = filePath + ext;
            entry.tags = tags;
            
            let matchesFilter = false;
            filters.forEach(filter => {
                matchesFilter = matchesFilter || entry.tags.indexOf(filter) !== -1;
            });

            if (matchesFilter || !stats.isFile() || filters.length === 0) {
                return [entry];
            }
        } catch (_) {
            // no-op
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
                await fs.access(letter + ":", fs.constants.R_OK);

                dirs.push({
                    name: letter + ":",
                    path: letter + ":" + path.sep
                });
            } catch (_) {
                LOG.debug("Skipping drive %s because it's unreadable", letter);
            }
        }));
    } else {
        LOG.debug("Reading dir %s", root);

        const dirents = await fs.readdir(root);

        for (const dirent of dirents) {
            try {
                const stats = await fs.stat(path.resolve(root, dirent));

                if (!stats.isDirectory()) {
                    continue;
                }

                dirs.push({
                    name: dirent,
                    path: path.join(root, dirent)
                });
            } catch (_) {
                continue;
            }
        }

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
    const newTags = Array.from(new Set([...tags, name]));

    const newName = filename + "[" + newTags.join(" ") + "]" + ext;

    const dir = path.basename(filePath);
    return fs.rename(filePath, path.resolve(dir, newName));
};

// Remove a tag from a file
export const removeTag = async(name: string, filePath: string) => {
    const [basePath, ext, tags] = splitFilename(filePath);
    tags.splice(tags.indexOf(name), 1);

    let newPath = basePath;

    if (tags.length > 0) {
        newPath += "[" + tags.join(" ") + "]";
    }

    newPath += ext;

    return fs.rename(filePath, newPath);
};

export const renameFile = async(filePath: string, newName: string) => {
    const [, , tags] = splitFilename(filePath);
    const [newBaseName, ext, newTags] = splitFilename(newName);

    const combinedTags = Array.prototype.concat(tags, newTags).sort();

    let newPath = filePath.replace(path.basename(filePath), "") + newBaseName;

    if (combinedTags.length > 0) {
        newPath += "[" + combinedTags.join(" ") + "]";
    }

    newPath += ext;
    
    return fs.rename(filePath, newPath);
};

export const removeFile = async(filePath: string) => fs.remove(filePath);

export const moveFile = async(oldPath: string, newPath: string) => fs.move(oldPath, newPath);
