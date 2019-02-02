import path from "path";
import fs from "fs-extra";
import config from "../server/config";
import db from "../server/db";
import resolvers from "../server/resolvers";
import os from "os";
import uuid from "uuid/v4";

describe("resolvers", () => {
    const root = path.resolve(os.tmpdir(), "tikett-test-resolvers-" + uuid());
    const filesDir = path.resolve(root, "files");
    const configPath = path.resolve(root, ".tikett.json");

    beforeAll(() => {
        fs.ensureDirSync(filesDir);
        fs.ensureFileSync(path.resolve(filesDir, "file1.txt"));
        fs.ensureFileSync(path.resolve(filesDir, "file1[tag1 tag2].txt"));
        fs.ensureFileSync(path.resolve(filesDir, "file2[tag1 tag2]"));
        fs.ensureFileSync(path.resolve(filesDir, "folder1", "file11[moretag].exe"));
        fs.ensureFileSync(path.resolve(filesDir, "folder1", "folder2", "file4[tag5 new_-ta%.g]"));

        config.load(configPath);
        config.setRoot(filesDir);

        db.init(filesDir);
        db.reloadFiles();
    });

    it("resolves config", () => {
        expect.assertions(1);

        expect(resolvers.config()).toEqual({
            root: filesDir,
        });
    });

    it("resolves tagGroups", () => {
        expect.assertions(1);

        expect(resolvers.tagGroups()).toEqual([
            {
                name: "Ungrouped",
                color: "#333",
                tags: ["tag1", "tag2", "moretag", "tag5", "new_-ta%.g"],
            }
        ]);
    });

    it("resolves files", () => {
        expect.assertions(2);

        const files = resolvers.files({
            current: "/",
            showDescendants: false,
        });

        expect(files).toHaveLength(5);
        expect(files).toEqual(expect.arrayContaining([
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
                tags: [{
                    name: "tag1",
                    color: "#333",
                }, {
                    name: "tag2",
                    color: "#333",
                }],
            }, {
                name: "file2",
                path: path.resolve(filesDir, "file2[tag1 tag2]"),
                isFile: true,
                tags: [{
                    name: "tag1",
                    color: "#333",
                }, {
                    name: "tag2",
                    color: "#333",
                }],
            }
        ]));
    });
});
