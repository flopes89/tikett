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

    it("adds a tag to a file", () => {
        resolvers.addTag({
            path: path.resolve(filesDir, "file1.txt"),
            name: "tag1"
        });

        const files = resolvers.files({
            current: "/",
            showDescendants: false,
            filters: [],
        });

        expect(files).toContainEqual({
            name: "file1.txt",
            path: path.resolve(filesDir, "file1[tag1].txt"),
            isFile: true,
            tags: ["tag1#333"],
        });
    });
});
