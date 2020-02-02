import path from "path";
import fs from "fs-extra";
import * as files from "./files";
import { createRoot } from "../testUtils";

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
    const root = await createRoot();

    const actual = await files.getFolders(root);

	await fs.remove(root);

    expect.assertions(2);

    expect(actual.length).toEqual(2);
    expect(actual).toEqual(expect.arrayContaining([
        {
            name: "..",
            path: path.resolve(root, "..")
        },
        {
            name: "folder1",
            path: path.resolve(root, "folder1"),
        }
    ]));
});

it("finds files", async() => {
    const root = await createRoot();

    const actual = await files.getFiles({
        root: root,
        current: "/",
        showDescendants: false,
        filters: [],
        refetch: new Date(),
    });

	await fs.remove(root);

    expect.assertions(2);

    expect(actual).toHaveLength(5);
    expect(actual).toEqual([
        {
            name: "..",
            path: path.resolve(root, ".."),
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
        }
    ]);
});

it("finds descendants", async() => {
    const root = await createRoot();

    const actual = await files.getFiles({
        root: root,
        current: "/",
        showDescendants: true,
        filters: [],
        refetch: new Date(),
    });

	await fs.remove(root);

    expect.assertions(2);

    expect(actual).toHaveLength(6);
    expect(actual).toEqual([
        {
            name: "file1.txt",
            isFile: true,
            path: path.resolve(root, "file1.txt"),
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
            name: path.join("folder1", "file11.exe"),
            path: path.resolve(root, "folder1", "file11[moretag].exe"),
            isFile: true,
            tags: ["moretag"],
        }, {
            name: path.join("folder1", "folder2", "file4.ext.split"),
            path: path.resolve(root, "folder1", "folder2", "file4[tag5 tag6].ext.split"),
            isFile: true,
            tags: ["tag5", "tag6"],
        }, {
            name: path.join("folder1", "folder2", "file5"),
            path: path.resolve(root, "folder1", "folder2", "file5[tag2]"),
            isFile: true,
            tags: ["tag2"],
        }
    ]);
});

it("filters by tags", async() => {
    const root = await createRoot();

    const actual = await files.getFiles({
        root: root,
        current: "/",
        showDescendants: false,
        filters: ["tag1"],
        refetch: new Date(),
    });

	await fs.remove(root);

    expect.assertions(2);

    expect(actual).toHaveLength(4);
    expect(actual).toEqual([
        {
            name: "..",
            path: path.resolve(root, ".."),
            isFile: false,
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
        }
    ]);
});

it("filters by tags with descendants", async() => {
    const root = await createRoot();

    const actual = await files.getFiles({
        root: root,
        current: "/",
        showDescendants: true,
        filters: ["tag2"],
        refetch: new Date(),
    });

	await fs.remove(root);

	expect.assertions(2);
	
    expect(actual).toHaveLength(3);
    expect(actual).toEqual([
        {
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
            name: path.join("folder1", "folder2", "file5"),
            path: path.resolve(root, "folder1", "folder2", "file5[tag2]"),
            isFile: true,
            tags: ["tag2"],
        }
    ]);
});

it("adds tag to file", async() => {
	const root = await createRoot();

	await files.addTagToFile("tag", path.resolve(root, "file1.txt"));
	await files.addTagToFile("tag", path.resolve(root, "file1[tag].txt"));
	await files.addTagToFile("tag3", path.resolve(root, "file1[tag1 tag2].txt"));
	await files.addTagToFile("tag hello world", path.resolve(root, "folder1", "file11[moretag].exe"));
	
    expect.assertions(3);

	await expect(fs.pathExists(path.resolve(root, "file1[tag].txt"))).resolves.toBeTruthy();
	await expect(fs.pathExists(path.resolve(root, "file1[tag1 tag2 tag3].txt"))).resolves.toBeTruthy();
	await expect(fs.pathExists(path.resolve(root, "folder1", "file11[moretag tag hello world].exe"))).resolves.toBeTruthy();

	await fs.remove(root);
});

it("removes tag from file", async() => {
	const root = await createRoot();

	await files.removeTag("tag", path.resolve(root, "file1.txt"));
	await files.removeTag("tag1", path.resolve(root, "file1[tag1 tag2].txt"));
	await files.removeTag("moretag", path.resolve(root, "folder1", "file11[moretag].exe"));

    expect.assertions(3);

	await expect(fs.pathExists(path.resolve(root, "file1.txt"))).resolves.toBeTruthy();
	await expect(fs.pathExists(path.resolve(root, "file1[tag2].txt"))).resolves.toBeTruthy();
	await expect(fs.pathExists(path.resolve(root, "folder1", "file11.exe"))).resolves.toBeTruthy();

	await fs.remove(root);
});
