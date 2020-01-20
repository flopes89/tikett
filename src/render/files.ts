import { promises as fs, constants } from "fs";
import path from "path";
import { load } from "./db";
import { createLogger } from "./logger";
import { used } from "windows-drive-letters";

export type PathEntry = {
    name: string;
    tags: string[];
    isFile: boolean;
    path: string;
};

export type FolderEntry = {
    name: string;
    path: string;
};

const LOG = createLogger("files");

// Finds all files under a given root (which is always relative to the db.root)
export const getFiles = async(
    root: string, showDescendants: boolean, filters: string[] = [], prefix = ""
): Promise<PathEntry[]> => {
    const db = await load();

    // Resolve the given root to be a relative folder under db.root
    const folder = path.resolve(path.join(db.root, root));
    const dirents = await fs.readdir(folder, { withFileTypes: true });

    const promises = dirents.map(async dirent => {
        if (dirent.name === ".tikett.json") {
            return;
        }

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
                const relativePath = path.relative(db.root, absolutePath);
                return getFiles(relativePath, showDescendants, filters, relativePath + "\\");
            }

            return [entry];
        }

        const matchTags = /\[([^\]]*)\]/.exec(dirent.name);
        if (matchTags) {
            entry.tags = matchTags[1].split(" ");
            entry.name = entry.name.replace(matchTags[0], "");
        }
        
        let matchesFilter = false;
        filters.forEach(filter => {
            matchesFilter = matchesFilter || entry.tags.indexOf(filter) !== -1;
        });

        if (matchesFilter || !dirent.isFile || filters.length === 0) {
            return [entry];
        }
    });

    const resolved = await Promise.all(promises);
    const entries: PathEntry[] = Array.prototype.concat(...resolved).filter(entry => Boolean(entry));

    if (!showDescendants) {
        entries.push({
            name: "..",
            isFile: false,
            path: path.resolve(folder, ".."),
            tags: [],
        });  
    }

    return entries;
};

// Fetch all folders under a given root
export const getFolders = async(root: string): Promise<FolderEntry[]> => {
    let dirs: FolderEntry[] = [];

    if (root === "/" && process.platform === "win32") {
        const letters = await used();
        await Promise.all(letters.map(async letter => {
            try {
                await fs.access(letter + ":", constants.R_OK);

                LOG.debug("Found drive letter %s", letter);

                dirs.push({
                    name: letter + ":",
                    path: letter + ":" + path.sep
                });
            } catch (e) {
                LOG.debug("Skipping drive %s because it's unreadable", letter);
            }
        }));
    } else {
        const dirents = await fs.readdir(root);

        const entryPromises = dirents.map(name => ({
                name,
                path: path.join(root, name)
            }))
            .filter(async entry => {
                const isDir = await fs.stat(entry.path);
                return isDir.isDirectory();
            });

        dirs = await Promise.all(entryPromises);

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
