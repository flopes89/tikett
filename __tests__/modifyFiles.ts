import path from "path";
import fs from "fs-extra";
import * as files from "../src/render/files";
import os from "os";
import uuid from "uuid/v4";

describe("modify files", () => {
	const root = path.resolve(os.tmpdir(), "tikett-test", "modify-files-" + uuid());
	const filesDir = path.resolve(root, "files");

	beforeEach(async() => {
		await fs.ensureDir(filesDir);
		await fs.ensureFile(path.resolve(filesDir, "file.txt"));
		await fs.ensureFile(path.resolve(filesDir, "file2[tag].ext.split"));
		await fs.ensureFile(path.resolve(filesDir, "file3[[[asd]__}}²_'']³[]².txt"));
	});

	afterEach(async() => {
		await fs.remove(filesDir);
	});

	it("adds tag to file", async() => {
		await files.addTagToFile("tag", path.resolve(filesDir, "file.txt"));
		await expect(fs.pathExists(path.resolve(filesDir, "file[tag].txt"))).resolves.toBeTruthy();

		await files.addTagToFile("tag_new", path.resolve(filesDir, "file2[tag].ext.split"));
		await expect(fs.pathExists(path.resolve(filesDir, "file2.ext[tag tag_new].split"))).resolves.toBeTruthy();

		await files.addTagToFile("tag hello world", path.resolve(filesDir, "file3[[[asd]__}}²_'']³[]².txt"));
		await expect(fs.pathExists(path.resolve(filesDir, "file3__}}²_'']³[]²[[[asd tag hello world].txt"))).resolves.toBeTruthy();
	});

	it("removes tag from file", async() => {
		await files.removeTag("tag", path.resolve(filesDir, "file.txt"));
		await expect(fs.pathExists(path.resolve(filesDir, "file.txt"))).resolves.toBeTruthy();

		await files.addTagToFile("tag", path.resolve(filesDir, "file2[tag].ext.split"));
		await expect(fs.pathExists(path.resolve(filesDir, "file2.ext.split"))).resolves.toBeTruthy();

		await files.addTagToFile("[[asd", path.resolve(filesDir, "file3[[[asd]__}}²_'']³[]².txt"));
		await expect(fs.pathExists(path.resolve(filesDir, "file3__}}²_'']³[]².txt"))).resolves.toBeTruthy();
	});
});
