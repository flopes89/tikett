import path from "path";
import fs from "fs";
import config from "../server/config";
import db from "../server/db";

describe("database", () => {
    const root = path.resolve(__dirname, "data");
    const dbPath = path.resolve(__dirname, "data", "tikettdb.json");

    beforeAll(() => {
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
        }

        config.setRoot(root);
    });

    afterAll(() => {
        fs.unlinkSync(dbPath);
    });

    it("initalizes a new database", () => {
        expect.assertions(2);

        db.init(root);

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
                path: path.resolve(root, "file1.txt"),
                isFile: true,
                tags: [],
            }, {
                name: "file1.txt",
                path: path.resolve(root, "file1[tag1 tag2].txt"),
                isFile: true,
                tags: ["tag1", "tag2"],
            }, {
                name: "file2",
                path: path.resolve(root, "file2[tag1 tag2]"),
                isFile: true,
                tags: ["tag1", "tag2"],
            }, {
                name: "folder1",
                path: path.resolve(root, "folder1"),
                isFile: false,
                tags: [],
            }, {
                name: "file11.exe",
                path: path.resolve(root, "folder1", "file11[moretag].exe"),
                isFile: true,
                tags: ["moretag"],
            }, {
                name: "folder2",
                path: path.resolve(root, "folder1", "folder2"),
                isFile: false,
                tags: [],
            }, {
                name: "file4",
                path: path.resolve(root, "folder1", "folder2", "file4[tag5 new_-ta%.g]"),
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
});
