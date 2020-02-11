import * as tags from "./tags";
import fs from "fs-extra";
import { createRoot } from "./testUtils";
import { DEFAULT_TAG_COLOR } from "../../shared/interface-types";

it("handles add group action", async() => {
    const root = await createRoot();

    await tags.createTagGroup({}, {
        name: "group3",
    },
    // @ts-ignore
    null, null);

    expect.assertions(1);

    const newGroups = await tags.tagGroups({}, {},
        // @ts-ignore
        null, null);

    expect(newGroups).toEqual([
        {
            name: "group1",
            color: "#fff",
            tags: ["tag1", "tag2"],
        }, {
            name: "group2",
            color: "#000",
            tags: ["tag3", "tag4"],
        }, {
            name: "group3",
            color: DEFAULT_TAG_COLOR,
            tags: [],
        }
    ]);

    await fs.remove(root);
});

it("handles remove group action", async() => {
    const root = await createRoot();

    await tags.removeTagGroup({}, {
        group: "group1",
    },
    // @ts-ignore
    null, null);

    expect.assertions(1);
    
    const newGroups = await tags.tagGroups({}, {},
        // @ts-ignore
        null, null);

    expect(newGroups).toEqual([
        {
            name: "group2",
            color: "#000",
            tags: ["tag3", "tag4"],
        }
    ]);

    await fs.remove(root);
});

it("handles move tag action", async() => {
    const root = await createRoot();

    await tags.moveTag({}, {
        tag: "tag1",
        group: "group2",
    },
    // @ts-ignore
    null, null);

    expect.assertions(1);
    
    const newGroups = await tags.tagGroups({}, {},
        // @ts-ignore
        null, null);

    expect(newGroups).toEqual([
        {
            name: "group1",
            color: "#fff",
            tags: ["tag2"],
        }, {
            name: "group2",
            color: "#000",
            tags: ["tag1", "tag3", "tag4"],
        }
    ]);

    await fs.remove(root);
});

it("handles move tag action (new tag)", async() => {
    const root = await createRoot();

    await tags.moveTag({}, {
        tag: "tag5",
        group: "group1",
    },
    // @ts-ignore
    null, null);

    expect.assertions(1);
    
    const newGroups = await tags.tagGroups({}, {},
        // @ts-ignore
        null, null);

    expect(newGroups).toEqual([
        {
            name: "group1",
            color: "#fff",
            tags: ["tag1", "tag2", "tag5"],
        }, {
            name: "group2",
            color: "#000",
            tags: ["tag3", "tag4"],
        }
    ]);

    await fs.remove(root);
});

it("handles move tag action (remove tag)", async() => {
    const root = await createRoot();

    await tags.moveTag({}, {
        tag: "tag3"
    },
    // @ts-ignore
    null, null);

    expect.assertions(1);
    
    const newGroups = await tags.tagGroups({}, {},
        // @ts-ignore
        null, null);

    expect(newGroups).toEqual([
        {
            name: "group1",
            color: "#fff",
            tags: ["tag1", "tag2"],
        }, {
            name: "group2",
            color: "#000",
            tags: ["tag4"],
        }
    ]);

    await fs.remove(root);
});

it("handles change color action", async() => {
    const root = await createRoot();

    await tags.changeColor({}, {
        group: "group1",
        color: "#ddd"
    },
    // @ts-ignore
    null, null);

    expect.assertions(1);
    
    const newGroups = await tags.tagGroups({}, {},
        // @ts-ignore
        null, null);

    expect(newGroups).toEqual([
        {
            name: "group1",
            color: "#ddd",
            tags: ["tag1", "tag2"],
        }, {
            name: "group2",
            color: "#000",
            tags: ["tag3", "tag4"],
        }
    ]);

    await fs.remove(root);
});
