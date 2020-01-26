import path from "path";
import fs from "fs-extra";
import * as tags from "../src/render/tags";
import os from "os";
import uuid from "uuid/v4";

describe("files", () => {
    const root = path.resolve(os.tmpdir(), "tikett-test", "tags-" + uuid());
    const filesDir = path.resolve(root, "files");

    beforeAll(async() => {
        await fs.ensureDir(filesDir);

        await db.load(root);
        await db.setRoot(filesDir);
    });

    it("adds group", async() => {
        expect.assertions(2);

        const group = await tags.ensureGroup("group1");
        
        expect(group).toBeTruthy();
        expect(group).toStrictEqual({
            name: "group1",
            color: tags.UNGROUPED_COLOR,
            tags: [],
        });
    });

    it("removes group", async() => {
        expect.assertions(2);

        const group = await tags.ensureGroup("group1");

        expect(group).toBeTruthy();

        await db.removeGroup(group.name);

        const dbContent = await db.load();

        expect(dbContent.tagGroups).toHaveLength(0);
    });

    it("adds tag", async() => {
        expect.assertions(3);

        const group = await tags.ensureGroup("group1");
        const tag = await tags.ensureTag("tag1", "group1");
        
        expect(tag).toBeTruthy();
        expect(group.tags).toEqual(expect.arrayContaining(["tag1"]));
        expect(tag).toStrictEqual("tag1");
    });
    
    it("finds correct color", async() => {
        expect.assertions(2);

        const group = await tags.ensureGroup("group1", "#696969");
        const tag = await tags.ensureTag("tag1", group.name);
        const color = await tags.getColorOfTag("tag1");
        
        expect(tag).toEqual("tag1");
        expect(color).toEqual("#696969");
    });

    it("changes group color", async() => {
        expect.assertions(2);

        const group = await tags.ensureGroup("group2");

        expect(group.color).toStrictEqual(tags.UNGROUPED_COLOR);

        await tags.ensureGroup("group2", "#112233");

        expect(group.color).toStrictEqual("#112233");
    });
    
    it("moves tag between groups", async() => {
        expect.assertions(3);

        await tags.ensureTag("tag2", "group2");
        const group2 = await tags.ensureGroup("group2");
        expect(group2.tags).toEqual(expect.arrayContaining(["tag2"]));

        await tags.ensureTag("tag2", "group3");
        const group3 = await tags.ensureGroup("group3");
        expect(group2.tags).toEqual(expect.arrayContaining([]));
        expect(group3.tags).toEqual(expect.arrayContaining(["tag2"]));
    });
});
