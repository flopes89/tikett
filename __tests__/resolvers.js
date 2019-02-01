import path from "path";
import fs from "fs";
import config from "../server/config";
import db from "../server/db";
import resolvers from "../server/resolvers";

describe("queries", () => {
    const root = path.resolve(__dirname, "data");
    const dbPath = path.resolve(root, "tikettdb.json");
    const configPath = path.resolve(__dirname, ".tikett.json");

    beforeAll(() => {
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
        }

        config.load(configPath);
        config.setRoot(root);

        db.init(root);
        db.reloadFiles();
    });

    afterAll(() => {
        fs.unlinkSync(dbPath);
    });

    it("resolves config", () => {
        expect.assertions(1);

        expect(resolvers.config()).toEqual({
            root,
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
                path: path.resolve(root, ".."),
                isFile: false,
                tags: [],
            }, {
                name: "folder1",
                path: path.resolve(root, "folder1"),
                isFile: false,
                tags: [],
            }, {
                name: "file1.txt",
                isFile: true,
                path: path.resolve(root, "file1.txt"),
                tags: [],
            }, {
                name: "file1.txt",
                path: path.resolve(root, "file1[tag1 tag2].txt"),
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
                path: path.resolve(root, "file2[tag1 tag2]"),
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
