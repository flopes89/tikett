import path from "path";
import fs from "fs-extra";
import { createLogger } from "./logger";
import { GqlTagGroup } from "../generated/graphql";

export type Db = {
    root: string;
    tagGroups: GqlTagGroup[];
};

const DEFAULT_DB: Db = {
    root: "",
    tagGroups: [],
};

const LOG = createLogger("db");

let db: Db = DEFAULT_DB;
let dbPath = __dirname;

export const getDbPath = () => dbPath;

export const getDb = () => db;

export const load = async(dbPathOverwrite?: string): Promise<Db> => {
    dbPath = path.resolve(dbPathOverwrite || getDbPath(), "tikett.json");

    LOG.silly("Loading DB from [%s]", dbPath);

    try {
        db = await fs.readJSON(dbPath);
    } catch (err) {
        LOG.warn("Could not load db, creating default Db");
        db = DEFAULT_DB;
        await persist();
    }

    return db;
};

export const persist = async() => {
    const dbPath = getDbPath();

    LOG.silly("Persisting DB to [%s]", dbPath);

    try {
        await fs.writeJSON(dbPath, db);
    } catch (err) {
        LOG.error("Could not write db", err);
    }
};
