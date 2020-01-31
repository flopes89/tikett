import path from "path";
import fs from "fs-extra";
import * as files from "../src/render/files";
import os from "os";
import uuid from "uuid/v4";

describe("read files", () => {
    const root = path.resolve(os.tmpdir(), "tikett-test", "read-files-" + uuid());
    const filesDir = path.resolve(root, "files");

    beforeAll(async() => {
        await fs.ensureDir(filesDir);
        await fs.ensureFile(path.resolve(filesDir, "file1.txt"));
        await fs.ensureFile(path.resolve(filesDir, "file1[tag1 tag2].txt"));
        await fs.ensureFile(path.resolve(filesDir, "file2[tag1 tag2]"));
        await fs.ensureFile(path.resolve(filesDir, "folder1", "file11[moretag].exe"));
        await fs.ensureFile(path.resolve(filesDir, "folder1", "folder2", "file4[tag5 tag6].ext.split"));
        await fs.ensureFile(path.resolve(filesDir, "folder1", "folder2", "file5[tag2]"));
    });

    afterAll(async() => {
        await fs.remove(root);
    });

    it("splits filenames", async() => {
        let [filename, ext, tags] = files.splitFilename("file");
        expect(filename).toEqual("file");
        expect(ext).toEqual("");
        expect(tags).toHaveLength(0);

        [filename, ext, tags] = files.splitFilename("file[tag1 tag2]");
        expect(filename).toEqual("file");
        expect(ext).toEqual("");
        expect(tags).toHaveLength(2);
        expect(tags).toEqual(expect.arrayContaining(["tag1", "tag2"]));

        [filename, ext, tags] = files.splitFilename("file[tag].txt");
        expect(filename).toEqual("file");
        expect(ext).toEqual(".txt");
        expect(tags).toHaveLength(1);
        expect(tags).toEqual(expect.arrayContaining(["tag"]));

        [filename, ext, tags] = files.splitFilename("folder" + path.sep + "file[tag].txt");
        expect(filename).toEqual("folder" + path.sep + "file");
        expect(ext).toEqual(".txt");
        expect(tags).toHaveLength(1);
        expect(tags).toEqual(expect.arrayContaining(["tag"]));

        [filename, ext, tags] = files.splitFilename("file..[tag[[123]][[][.text.ext.split");
        expect(filename).toEqual("file..][[][.text.ext");
        expect(ext).toEqual(".split");
        expect(tags).toHaveLength(1);
        expect(tags).toEqual(expect.arrayContaining(["tag[[123"]))
    });

    it("finds folders", async() => {
        expect.assertions(2);

        const actual = await files.getFolders(filesDir);

        expect(actual.length).toEqual(2);
        expect(actual).toEqual(expect.arrayContaining([
            {
                name: "..",
                path: path.resolve(filesDir, "..")
            },
            {
                name: "folder1",
                path: path.resolve(filesDir, "folder1"),
            }
        ]));
    });

    it("finds files", async() => {
        expect.assertions(2);

        const actual = await files.getFiles({
            root: filesDir,
            current: "/",
            showDescendants: false,
            filters: [],
            refetch: new Date(),
            tagColorMap: new Map<string, string>(),
        });

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
                tags: ["tag1#", "tag2#"],
            }, {
                name: "file2",
                path: path.resolve(filesDir, "file2[tag1 tag2]"),
                isFile: true,
                tags: ["tag1#", "tag2#"],
            }
        ]));
    });
    
    it("finds descendants", async() => {
        expect.assertions(2);

        const actual = await files.getFiles({
            root: filesDir,
            current: "/",
            showDescendants: true,
            filters: [],
            refetch: new Date(),
            tagColorMap: new Map<string, string>(),
        });

        expect(actual).toHaveLength(6);
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
                tags: ["tag1#", "tag2#"],
            }, {
                name: "file2",
                path: path.resolve(filesDir, "file2[tag1 tag2]"),
                isFile: true,
                tags: ["tag1#", "tag2#"],
            }, {
                name: path.join("folder1", "file11.exe"),
                path: path.resolve(filesDir, "folder1", "file11[moretag].exe"),
                isFile: true,
                tags: ["moretag#"],
            }, {
                name: path.join("folder1", "folder2", "file4.ext.split"),
                path: path.resolve(filesDir, "folder1", "folder2", "file4[tag5 tag6].ext.split"),
                isFile: true,
                tags: ["tag5#", "tag6#"],
            }, {
                name: path.join("folder1", "folder2", "file5"),
                path: path.resolve(filesDir, "folder1", "folder2", "file5[tag2]"),
                isFile: true,
                tags: ["tag2#"],
            }
        ]));
    });
    
    it("filters by tags", async() => {
        expect.assertions(2);

        const actual = await files.getFiles({
            root: filesDir,
            current: "/",
            showDescendants: false,
            filters: ["tag1#"],
            refetch: new Date(),
            tagColorMap: new Map<string, string>(),
        });

        expect(actual).toHaveLength(4);
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
                path: path.resolve(filesDir, "file1[tag1 tag2].txt"),
                isFile: true,
                tags: ["tag1#", "tag2#"],
            }, {
                name: "file2",
                path: path.resolve(filesDir, "file2[tag1 tag2]"),
                isFile: true,
                tags: ["tag1#", "tag2#"],
            }
        ]));
    });

    it("filters by tags with descendants", async() => {
        expect.assertions(2);

        const actual = await files.getFiles({
            root: filesDir,
            current: "/",
            showDescendants: true,
            filters: ["tag2#"],
            refetch: new Date(),
            tagColorMap: new Map<string, string>(),
        });

        expect(actual).toHaveLength(3);
        expect(actual).toEqual(expect.arrayContaining([
            {
                name: "file1.txt",
                path: path.resolve(filesDir, "file1[tag1 tag2].txt"),
                isFile: true,
                tags: ["tag1#", "tag2#"],
            }, {
                name: "file2",
                path: path.resolve(filesDir, "file2[tag1 tag2]"),
                isFile: true,
                tags: ["tag1#", "tag2#"],
            }, {
                name: path.join("folder1", "folder2", "file5"),
                path: path.resolve(filesDir, "folder1", "folder2", "file5[tag2]"),
                isFile: true,
                tags: ["tag2#"],
            }
        ]));
    });
});
