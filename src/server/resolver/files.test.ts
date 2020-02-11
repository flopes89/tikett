import path from "path";
import fs from "fs-extra";
import * as files from "../resolver/files";
import { createRoot } from "../../client/testUtils";

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

    const actual = await files.folders({}, {
        current: root,
    }, 
    // @ts-ignore
    null, null);

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

    const actual = await files.files({}, {
        current: "/",
        showDescendants: false,
        filters: [],
    },
    // @ts-ignore
    null, null);

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

    const actual = await files.files({}, {
        current: "/",
        showDescendants: true,
        filters: [],
    },
    // @ts-ignore
    null, null);

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

    const actual = await files.files({}, {
        current: "/",
        showDescendants: false,
        filters: ["tag1"],
    },
    // @ts-ignore
    null, null);

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

    const actual = await files.files({}, {
        current: "/",
        showDescendants: true,
        filters: ["tag2"],
    },
    // @ts-ignore
    null, null);

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

	await files.addTagToFile({}, {
        tag: "tag",
        path: path.resolve(root, "file1.txt")
    },
    // @ts-ignore
    null, null);

	await files.addTagToFile({}, {
        tag: "tag",
        path: path.resolve(root, "file1[tag].txt")
    },
    // @ts-ignore
    null, null);

	await files.addTagToFile({}, {
        tag: "tag3",
        path: path.resolve(root, "file1[tag1 tag2].txt")
    },
    // @ts-ignore
    null, null);

	await files.addTagToFile({}, {
        tag: "tag hello world",
        path: path.resolve(root, "folder1", "file11[moretag].exe")
    },
    // @ts-ignore
    null, null);
	
    expect.assertions(3);

	await expect(fs.pathExists(path.resolve(root, "file1[tag].txt"))).resolves.toBeTruthy();
	await expect(fs.pathExists(path.resolve(root, "file1[tag1 tag2 tag3].txt"))).resolves.toBeTruthy();
	await expect(fs.pathExists(path.resolve(root, "folder1", "file11[moretag tag hello world].exe"))).resolves.toBeTruthy();

	await fs.remove(root);
});

it("removes tag from file", async() => {
	const root = await createRoot();

	await files.removeTag({}, {
        tag: "tag",
        path: path.resolve(root, "file1.txt")
    },
    // @ts-ignore
    null, null);

	await files.removeTag({}, {
        tag: "tag1",
        path: path.resolve(root, "file1[tag1 tag2].txt")
    },
    // @ts-ignore
    null, null);

	await files.removeTag({}, {
        tag: "moretag",
        path: path.resolve(root, "folder1", "file11[moretag].exe")
    },
    // @ts-ignore
    null, null);

    expect.assertions(3);

	await expect(fs.pathExists(path.resolve(root, "file1.txt"))).resolves.toBeTruthy();
	await expect(fs.pathExists(path.resolve(root, "file1[tag2].txt"))).resolves.toBeTruthy();
	await expect(fs.pathExists(path.resolve(root, "folder1", "file11.exe"))).resolves.toBeTruthy();

	await fs.remove(root);
});

it("renames files", async() => {
    const root = await createRoot();

    await files.renameFile(path.resolve(root, "file1.txt"), "file1_new.txt");
    await files.renameFile(path.resolve(root, "file1[tag1 tag2].txt"), "file1_new");
    await files.renameFile(path.resolve(root, "folder1", "file11[moretag].exe"), "file11[test].exe");

    expect.assertions(3);

	await expect(fs.pathExists(path.resolve(root, "file1_new.txt"))).resolves.toBeTruthy();
	await expect(fs.pathExists(path.resolve(root, "file1_new[tag1 tag2]"))).resolves.toBeTruthy();
    await expect(fs.pathExists(path.resolve(root, "folder1", "file11[moretag test].exe"))).resolves.toBeTruthy();
    
    await fs.remove(root);
});

it("removes files", async() => {
    const root = await createRoot();

    await files.removeFile(path.resolve(root, "file1.txt"));
    await files.removeFile(path.resolve(root, "file1[tag1 tag2].txt"));
    await files.removeFile(path.resolve(root, "folder1", "file11[moretag].exe"));

    expect.assertions(3);

	await expect(fs.pathExists(path.resolve(root, "file1.txt"))).resolves.toBeFalsy();
	await expect(fs.pathExists(path.resolve(root, "file1[tag1 tag2]"))).resolves.toBeFalsy();
    await expect(fs.pathExists(path.resolve(root, "folder1", "file11[moretag].exe"))).resolves.toBeFalsy();
    
    await fs.remove(root);
});

it("moves files", async() => {
    const root = await createRoot();

    await files.moveFile(path.resolve(root, "file1.txt"), path.resolve(root, "folder1", "file1.txt"));
    await files.moveFile(path.resolve(root, "file1[tag1 tag2].txt"), path.resolve(root, "folder1", "file1[tag1 tag2].txt"));
    await files.moveFile(path.resolve(root, "folder1", "file11[moretag].exe"), path.resolve(root, "file11[moretag].exe"));

    expect.assertions(3);

	await expect(fs.pathExists(path.resolve(root, "folder1", "file1.txt"))).resolves.toBeTruthy();
	await expect(fs.pathExists(path.resolve(root, "folder1", "file1[tag1 tag2].txt"))).resolves.toBeTruthy();
    await expect(fs.pathExists(path.resolve(root, "file11[moretag].exe"))).resolves.toBeTruthy();
    
    await fs.remove(root);
});
