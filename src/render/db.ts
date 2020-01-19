import { useState } from "react";
import path from "path";
import os from "os";
import { promises as fs, constants } from "fs";
import { createLogger } from "./logger";
import { useEffect } from "react";
import { TagGroup } from "./tags";

type Db = {
    root: string;
    tagGroups: TagGroup[];
};

// Overwritten if load(string) is called with a different root
let DB_PATH = path.resolve(os.homedir(), ".tikett.json");

// In memory representation of the DB, persisting must be done manually (for now?)
let DB: Db|null = null;

const LOG = createLogger("db");

// Load the database from the given root (or os.homedir if no root is provided)
// Note that this returns the object itself, so changes to it are not persisted automatically
export const load = async(root?: string): Promise<Db> => {
    if (DB) {
        return DB;
    }

    if (root) {
        DB_PATH = path.resolve(root, ".tikett.json");
    }

    try {
        await fs.access(DB_PATH, constants.F_OK);
    } catch (err) {
        LOG.info("No db found at %s, creating with defaults", DB_PATH);
        DB = {
            root: path.resolve(DB_PATH, ".."),
            tagGroups: []
        };
        await write();
    }

    try {
        LOG.debug("Loading db from %s", DB_PATH);
        const data = await fs.readFile(DB_PATH);
        DB = JSON.parse(data.toString());
    } catch (err) {
        LOG.error("Could not read DB at %s", DB_PATH);
        throw err;
    }

    if (!DB) {
        throw new Error("No DB found. This should not happen...");
    }
    
    return DB;
};

// Write the current memory contents of db to DB_PATH
const write = async(): Promise<void> => {
    LOG.debug("Writing db to %s", DB_PATH);
    return fs.writeFile(DB_PATH, JSON.stringify(DB, null, 2));
};

// Sets a root folder in the DB and persists it
export const persistRoot = async(root: string): Promise<void> => {
    const db = await load();
    db.root = root;
    LOG.debug("New root: %s", db.root);
    await write();
};

export const writeTagGroups = async(groups: TagGroup[]): Promise<void> => {
    const db = await load();
    db.tagGroups = groups;
    LOG.debug("New tagGroups: %s", db.tagGroups);
    await write();
};

// React hook to load the DB and return it
export const useDb = (): Db|null => {
    const [db, setDb] = useState<Db|null>(null);

    useEffect(() => {
        (async() => {
            setDb(await load());
        })();
    });

    return db;
};
