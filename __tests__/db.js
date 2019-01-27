import path from "path";
import fs from "fs";
import db from "../server/db";

describe("datbase", () => {
    const root = path.resolve(__dirname, "data");
    const dbPath = path.resolve(__dirname, "data", "tikettdb.json");

    beforeAll(() => {
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
        }
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
        expect(files).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "file1.txt",
                    path: path.resolve(root, "file1.txt"),
                    tags: [],
                    isFile: true,
                }),
                expect.objectContaining({
                    name: "file1.txt",
                    path: path.resolve(root, "file1[tag1 tag2].txt"),
                    tags: ["tag1", "tag2"],
                    isFile: true,
                }),
                expect.objectContaining({
                    name: "file2",
                    path: path.resolve(root, "file2[tag1 tag2]"),
                    tags: ["tag1", "tag2"],
                    isFile: true,
                }),
                expect.objectContaining({
                    name: "folder1",
                    path: path.resolve(root, "folder1"),
                    tags: [],
                    isFile: false,
                }),
                expect.objectContaining({
                    name: "file11.exe",
                    path: path.resolve(root, "folder1", "file11[moretag].exe"),
                    tags: ["moretag"],
                    isFile: true,
                }),
                expect.objectContaining({
                    name: "folder2",
                    path: path.resolve(root, "folder1", "folder2"),
                    tags: [],
                    isFile: false,
                }),
                expect.objectContaining({
                    name: "file4",
                    path: path.resolve(root, "folder1", "folder2", "file4[tag5 new_-ta%.g]"),
                    tags: ["tag5", "new_-ta%.g"],
                    isFile: true,
                }),
            ])
        );

        const tagGroups = db.getTagGroups();

        expect(tagGroups).toHaveLength(1);
        expect(tagGroups).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Ungrouped",
                    color: "#333",
                    tags: expect.arrayContaining([
                        expect.objectContaining({
                            name: "tag1",
                            color: "#ccc",
                        }),
                        expect.objectContaining({
                            name: "tag2",
                            color: "#ccc",
                        }),
                        expect.objectContaining({
                            name: "moretag",
                            color: "#ccc",
                        }),
                        expect.objectContaining({
                            name: "tag5",
                            color: "#ccc",
                        }),
                        expect.objectContaining({
                            name: "new_-ta%.g",
                            color: "#ccc",
                        }),
                    ]),
                }),
            ]),
        );
    });
});
