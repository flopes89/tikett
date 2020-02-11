import path from "path";
import fs from "fs-extra";
import os from "os";
import uuid from "uuid/v4";
import { load, getDb, persist } from "../server/db";

export const createRoot = async(): Promise<string> => {
    const root = path.resolve(os.tmpdir(), "tikett-test", uuid());
    
    load(root);
    const db = await getDb();
    db.root = root;
    persist();
    
    await fs.ensureDir(root);
    await fs.ensureFile(path.resolve(root, "file1.txt"));
    await fs.ensureFile(path.resolve(root, "file1[tag1 tag2].txt"));
    await fs.ensureFile(path.resolve(root, "file2[tag1 tag2]"));
    await fs.ensureFile(path.resolve(root, "folder1", "file11[moretag].exe"));
    await fs.ensureFile(path.resolve(root, "folder1", "folder2", "file4[tag5 tag6].ext.split"));
    await fs.ensureFile(path.resolve(root, "folder1", "folder2", "file5[tag2]"));

    return root;
};
