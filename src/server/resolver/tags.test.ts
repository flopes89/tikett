import * as tags from "./tags";

const INITIAL_STATE: TagsState = {
    groups: [{
        name: "group1",
        color: "#fff",
        tags: ["tag1", "tag2"],
    }, {
        name: "group2",
        color: "#000",
        tags: ["tag3", "tag4"],
    }]
};

it("handles add group action", () => {
    const newState = tagsReducer(INITIAL_STATE, {
        type: ACTION.ADD_GROUP,
        name: "group3",
    });

    expect.assertions(2);
    expect(newState).not.toBe(INITIAL_STATE);
    expect(newState).toEqual(<TagsState>{
        groups: [{
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
        }]
    });
});

it("handles remove group action", () => {
    const newState = tagsReducer(INITIAL_STATE, {
        type: ACTION.REMOVE_GROUP,
        name: "group1",
    });

    expect.assertions(2);
    expect(newState).not.toBe(INITIAL_STATE);
    expect(newState).toEqual(<TagsState>{
        groups: [{
            name: "group2",
            color: "#000",
            tags: ["tag3", "tag4"],
        }]
    });
});

it("handles move tag action", () => {
    const newState = tagsReducer(INITIAL_STATE, {
        type: ACTION.MOVE_TAG,
        tagName: "tag1",
        groupName: "group2",
    });

    expect.assertions(2);
    expect(newState).not.toBe(INITIAL_STATE);
    expect(newState).toEqual(<TagsState>{
        groups: [{
            name: "group1",
            color: "#fff",
            tags: ["tag2"],
        }, {
            name: "group2",
            color: "#000",
            tags: ["tag1", "tag3", "tag4"],
        }]
    });
});

it("handles move tag action (new tag)", () => {
    const newState = tagsReducer(INITIAL_STATE, {
        type: ACTION.MOVE_TAG,
        tagName: "tag5",
        groupName: "group1",
    });

    expect.assertions(2);
    expect(newState).not.toBe(INITIAL_STATE);
    expect(newState).toEqual(<TagsState>{
        groups: [{
            name: "group1",
            color: "#fff",
            tags: ["tag1", "tag2", "tag5"],
        }, {
            name: "group2",
            color: "#000",
            tags: ["tag3", "tag4"],
        }]
    });
});

it("handles move tag action (remove tag)", () => {
    const newState = tagsReducer(INITIAL_STATE, {
        type: ACTION.MOVE_TAG,
        tagName: "tag3"
    });

    expect.assertions(2);
    expect(newState).not.toBe(INITIAL_STATE);
    expect(newState).toEqual(<TagsState>{
        groups: [{
            name: "group1",
            color: "#fff",
            tags: ["tag1", "tag2"],
        }, {
            name: "group2",
            color: "#000",
            tags: ["tag4"],
        }]
    });
});

it("handles change color action", () => {
    const newState = tagsReducer(INITIAL_STATE, {
        type: ACTION.CHANGE_COLOR,
        name: "group1",
        color: "#ddd"
    });

    expect.assertions(2);
    expect(newState).not.toBe(INITIAL_STATE);
    expect(newState).toEqual(<TagsState>{
        groups: [{
            name: "group1",
            color: "#ddd",
            tags: ["tag1", "tag2"],
        }, {
            name: "group2",
            color: "#000",
            tags: ["tag3", "tag4"],
        }]
    });
});
