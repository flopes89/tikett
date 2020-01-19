import path from "path";
import fs from "fs-extra";
import * as files from "../src/render/files";
import * as db from "../src/render/db";
import os from "os";
import uuid from "uuid/v4";

describe("files", () => {
    const root = path.resolve(os.tmpdir(), "tikett-test", "files-" + uuid());
    const filesDir = path.resolve(root, "files");

    beforeAll(async () => {
        await fs.ensureDir(filesDir);
        await fs.ensureFile(path.resolve(filesDir, "file1.txt"));
        await fs.ensureFile(path.resolve(filesDir, "file1[tag1 tag2].txt"));
        await fs.ensureFile(path.resolve(filesDir, "file2[tag1 tag2]"));
        await fs.ensureFile(path.resolve(filesDir, "folder1", "file11[moretag].exe"));
        await fs.ensureFile(path.resolve(filesDir, "folder1", "folder2", "file4[tag5 new_-ta%.g]"));

        await db.load(root);
        await db.persistRoot(filesDir);
    });
    
    it("finds folders", async() => {
        expect.assertions(1);

        const actual = await files.getFolders("/");

        expect(actual.length).toBeGreaterThan(0);
    });

    it("finds files", async() => {
        expect.assertions(2);

        const actual = await files.getFiles("/", false);

        expect(actual).toHaveLength(5);
        expect(actual).toEqual(expect.arrayContaining([
            {
                name: "..",
                path: path.resolve(filesDir, ".."),
                isFile: false,
                tags: [],
            }, {
                name: "folder1",
                path: path.resolve(filesDir, "folder1"),
                isFile: false,
                tags: [],
            }, {
                name: "file1.txt",
                isFile: true,
                path: path.resolve(filesDir, "file1.txt"),
                tags: [],
            }, {
                name: "file1.txt",
                path: path.resolve(filesDir, "file1[tag1 tag2].txt"),
                isFile: true,
                tags: ["tag1", "tag2"],
            }, {
                name: "file2",
                path: path.resolve(filesDir, "file2[tag1 tag2]"),
                isFile: true,
                tags: ["tag1", "tag2"],
            }
        ]));
    });
    
    it("finds descendants", async() => {
        expect.assertions(2);

        const actual = await files.getFiles("/", true);

        expect(actual).toHaveLength(5);
        expect(actual).toEqual(expect.arrayContaining([
            {
                name: "file1.txt",
                isFile: true,
                path: path.resolve(filesDir, "file1.txt"),
                tags: [],
            }, {
                name: "file1.txt",
                path: path.resolve(filesDir, "file1[tag1 tag2].txt"),
                isFile: true,
                tags: ["tag1", "tag2"],
            }, {
                name: "file2",
                path: path.resolve(filesDir, "file2[tag1 tag2]"),
                isFile: true,
                tags: ["tag1", "tag2"],
            }, {
                name: path.join("folder1", "file11.exe"),
                path: path.resolve(filesDir, "folder1", "file11[moretag].exe"),
                isFile: true,
                tags: ["moretag"],
            }, {
                name: path.join("folder1", "folder2", "file4"),
                path: path.resolve(filesDir, "folder1", "folder2", "file4[tag5 new_-ta%.g]"),
                isFile: true,
                tags: ["tag5", "new_-ta%.g"],
            }
        ]));
    });
});
