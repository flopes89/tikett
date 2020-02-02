import { TagsState, tagsReducer, ACTION } from "./tags";

const INITIAL_STATE: TagsState = {
    groups: [{
        name: "group1",
        tags: [{
            name: "tag1",
            color: "#fff",
        }, {
            name: "tag2",
            color: "#fff",
        }],
    }, {
        name: "group2",
        tags: [{
            name: "tag3",
            color: "#000",
        }, {
            name: "tag4",
            color: "#000",
        }],
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
            tags: [{
                name: "tag1",
                color: "#fff",
            }, {
                name: "tag2",
                color: "#fff",
            }],
        }, {
            name: "group2",
            tags: [{
                name: "tag3",
                color: "#000",
            }, {
                name: "tag4",
                color: "#000",
            }],
        }, {
            name: "group3",
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
            tags: [{
                name: "tag3",
                color: "#000",
            }, {
                name: "tag4",
                color: "#000",
            }],
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
            tags: [{
                name: "tag2",
                color: "#fff",
            }],
        }, {
            name: "group2",
            tags: [{
                name: "tag1",
                color: "#000",
            }, {
                name: "tag3",
                color: "#000",
            }, {
                name: "tag4",
                color: "#000",
            }],
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
            tags: [{
                name: "tag1",
                color: "#fff",
            }, {
                name: "tag2",
                color: "#fff",
            }, {
                name: "tag5",
                color: "#fff",
            }],
        }, {
            name: "group2",
            tags: [{
                name: "tag3",
                color: "#000",
            }, {
                name: "tag4",
                color: "#000",
            }],
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
            tags: [{
                name: "tag1",
                color: "#ddd",
            }, {
                name: "tag2",
                color: "#ddd",
            }],
        }, {
            name: "group2",
            tags: [{
                name: "tag3",
                color: "#000",
            }, {
                name: "tag4",
                color: "#000",
            }],
        }]
    });
});
