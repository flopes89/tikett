import path from "path";
import fs from "fs-extra";
import config from "../server/config";
import db from "../server/db";
import os from "os";
import uuid from "uuid/v4";

describe("database", () => {
    const root = path.resolve(os.tmpdir(), "tikett-test-db-" + uuid());
    const filesDir = path.resolve(root, "files");
    const dbPath = path.resolve(filesDir, "tikettdb.json");
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
    });

    it("initalizes a new database", () => {
        expect.assertions(2);

        db.init(filesDir);

        expect(fs.existsSync(dbPath)).toBeTruthy();

        const current = JSON.parse(fs.readFileSync(dbPath));

        expect(current).toEqual({
            files: [],
            tagGroups: [{
                name: "Ungrouped",
                color: "#333",
                tags: [],
            }],
        });
    });

    it("reads files into database", () => {
        expect.assertions(4);

        db.reloadFiles();

        const files = db.getFiles();

        expect(files).toHaveLength(7);
        expect(files).toEqual(expect.arrayContaining([
            {
                name: "file1.txt",
                path: path.resolve(filesDir, "file1.txt"),
                isFile: true,
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
                name: "folder1",
                path: path.resolve(filesDir, "folder1"),
                isFile: false,
                tags: [],
            }, {
                name: "file11.exe",
                path: path.resolve(filesDir, "folder1", "file11[moretag].exe"),
                isFile: true,
                tags: ["moretag"],
            }, {
                name: "folder2",
                path: path.resolve(filesDir, "folder1", "folder2"),
                isFile: false,
                tags: [],
            }, {
                name: "file4",
                path: path.resolve(filesDir, "folder1", "folder2", "file4[tag5 new_-ta%.g]"),
                isFile: true,
                tags: ["tag5", "new_-ta%.g"],
            }
        ]));

        const tagGroups = db.getTagGroups();

        expect(tagGroups).toHaveLength(1);
        expect(tagGroups).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Ungrouped",
                    color: "#333",
                    tags: expect.arrayContaining(["tag1", "tag2", "moretag", "tag5", "new_-ta%.g"]),
                }),
            ]),
        );
    });

    it("creates new tagGroup", () => {
        expect.assertions(2);

        db.createTagGroup("new_group");
        const groups = db.getTagGroups();

        expect(groups).toHaveLength(2);
        expect(groups).toContainEqual({
            name: "new_group",
            color: "#333",
            tags: []
        });
    });

    it("changes tagGroup color", () => {
        expect.assertions(1);

        db.changeColor("new_group", "#fff");

        db.getTagGroups().forEach((group) => {
            if (group.name !== "new_group") {
                return;
            }

            expect(group.color).toBe("#fff");
        });
    });
});
