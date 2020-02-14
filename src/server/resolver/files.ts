import path from "path";
import fs from "fs-extra";
import { constants } from "fs";
import { GqlFile, GqlFolder, GqlMutationResolvers, GqlQueryResolvers } from "../../generated/graphql";
import { createLogger } from "../logger";
import { getDb } from "../db";
import { used } from "windows-drive-letters";

const LOG = createLogger("filesResolver");

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

    LOG.debug("Split up filename [%s] into [%s, %s, %s]", filePath, name, ext, tags);

    return [name, ext, tags];
};

// Finds all files under a given root (which is always relative to the db.root)
const getFiles = async(
    root: string,
    current: string,
    showDescendants: boolean,
    filters: string[],
    prefix: string = ""
): Promise<GqlFile[]> => {

    // Resolve the given root to be a relative folder under root
    const folder = path.resolve(path.join(root, current));
    const dirents = await fs.readdir(folder);

    const promises = dirents.map(async dirent => {
        if (dirent === "tikett.json") {
            return [];
        }

        try {
            const absolutePath = path.join(folder, dirent);
            const stats = await fs.stat(absolutePath);

            const entry: GqlFile = {
                name: prefix + dirent,
                tags: [],
                isFile: stats.isFile(),
                path: absolutePath,
            };

            LOG.silly("Creating PathEntry for [%s]", absolutePath);

            if (stats.isDirectory()) {
                if (showDescendants) {
                    const relativePath = path.relative(root, absolutePath);
                    return getFiles(
                        root,
                        relativePath,
                        showDescendants,
                        filters,
                        relativePath + path.sep,
                    );
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
    const entries: GqlFile[] = Array.prototype.concat(...resolved);

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

export const files: GqlQueryResolvers["files"] = async(root, args) => {
    const rootPath = getDb().root;
    return getFiles(
        rootPath,
        args.current,
        args.showDescendants,
        args.filters,
    );
};

export const folders: GqlQueryResolvers["folders"] = async(root, args) => {
    let dirs: GqlFolder[] = [];

    if (args.current === "/" && process.platform === "win32") {
        LOG.debug("Searching for drive letters");

        const letters = await used();
        await Promise.all(letters.map(async letter => {
            try {
                await fs.access(letter + ":", constants.R_OK);

                dirs.push({
                    name: letter + ":",
                    path: letter + ":" + path.sep
                });
            } catch (_) {
                LOG.debug("Skipping drive [%s] because it's unreadable", letter);
            }
        }));
    } else {
        LOG.silly("Reading dir [%s]", args.current);

        const dirents = await fs.readdir(args.current);

        for (const dirent of dirents) {
            try {
                const stats = await fs.stat(path.resolve(args.current, dirent));

                if (!stats.isDirectory()) {
                    continue;
                }

                dirs.push({
                    name: dirent,
                    path: path.join(args.current, dirent)
                });
            } catch (_) {
                // no-op
            }
        }

        // Add a "back to root" option for windows to get back to the drive selection
        if (/^[a-z]:\\$/i.test(args.current) && process.platform === "win32") {
            dirs.unshift({
                name: "Select different drive",
                path: "/",
            });
        } else {
            dirs.unshift({
                name: "..",
                path: path.resolve(args.current, "..")
            });
        }
    }

    return dirs;
};

// Add a tag to a file
export const addTag: GqlMutationResolvers["addTag"] = async(root, args) => {
    LOG.info(`Adding tag [%s] to [%s]`, args.tag, args.path);

    const [filename, ext, tags] = splitFilename(args.path);
    const newTags = Array.from(new Set([...tags, args.tag]));

    const newName = filename + "[" + newTags.join(" ") + "]" + ext;

    const dir = path.basename(args.path);
    await fs.rename(args.path, path.resolve(dir, newName));

    return true;
};

// Remove a tag from a file
export const removeTag: GqlMutationResolvers["removeTag"] = async(root, args) => {
    LOG.info(`Removing tag [%s] from [%s]`, args.tag, args.path);

    const [basePath, ext, tags] = splitFilename(args.path);
    tags.splice(tags.indexOf(args.tag), 1);

    let newPath = basePath;

    if (tags.length > 0) {
        newPath += "[" + tags.join(" ") + "]";
    }

    newPath += ext;

    await fs.rename(args.path, newPath);

    return true;
};

export const renameFile: GqlMutationResolvers["renameFile"] = async(root, args) => {
    LOG.info(`Renaming [%s] to [%s]`, args.path, args.newName);

    const [, , tags] = splitFilename(args.path);
    const [newBaseName, ext, newTags] = splitFilename(args.newName);

    const combinedTags = Array.prototype.concat(tags, newTags).sort();

    let newPath = args.path.replace(path.basename(args.path), "") + newBaseName;

    if (combinedTags.length > 0) {
        newPath += "[" + combinedTags.join(" ") + "]";
    }

    newPath += ext;
    
    await fs.rename(args.path, newPath);

    return true;
};

export const removeFile: GqlMutationResolvers["removeFile"] = async(root, args) => {
    LOG.info("Removing file [%s]", args.path);

    await fs.unlink(args.path);

    return true;
};

export const moveFile = async(oldPath: string, newPath: string) => fs.rename(oldPath, newPath);
