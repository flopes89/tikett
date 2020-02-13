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
let dbPath = path.resolve(process.env.DBPATH || __dirname, "tikett.json");

export const getDbPath = () => dbPath;

export const getDb = () => db;

export const load = async(dbPathOverwrite?: string): Promise<Db> => {
    dbPath = dbPathOverwrite || getDbPath();

    LOG.silly("Loading DB from [%s]", dbPath);

    try {
        await fs.ensureFile(dbPath);    
        db = await fs.readJSON(dbPath);
    } catch (err) {
        LOG.debug("Creating default Db at [%s]", dbPath);
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
