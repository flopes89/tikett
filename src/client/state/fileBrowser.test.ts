import { FileBrowserState, fileBrowserReducer, ACTION } from "./fileBrowser";

const INITIAL_DATE = new Date();

const INITIAL_STATE: FileBrowserState = {
    currentFolder: "/some-folder/",
    showDescendants: false,
    filters: [],
    selected: "",
};

it("handles toggle descendants action", () => {
    expect.assertions(2);

    const newState = fileBrowserReducer(INITIAL_STATE, {
        type: ACTION.TOGGLE_DESCENDANTS,
    });

    expect(newState).not.toBe(INITIAL_STATE);
    expect(newState.showDescendants).toBeTruthy();
});

it("handles open folder action", () => {
    expect.assertions(6);

    const openFolder1 = fileBrowserReducer(INITIAL_STATE, {
        type: ACTION.OPEN_FOLDER,
        folder: "folder1"
    });

    expect(openFolder1).not.toBe(INITIAL_STATE);
    expect(openFolder1.currentFolder).toEqual("/some-folder/folder1/");

    const openFolder2 = fileBrowserReducer(openFolder1, {
        type: ACTION.OPEN_FOLDER,
        folder: "folder2",
    });

    expect(openFolder2).not.toBe(openFolder1);
    expect(openFolder2.currentFolder).toEqual("/some-folder/folder1/folder2/");

    const openFolder3 = fileBrowserReducer(openFolder2, {
        type: ACTION.OPEN_FOLDER,
        folder: "..",
    });

    expect(openFolder3).not.toBe(openFolder2);
    expect(openFolder3.currentFolder).toEqual("/some-folder/folder1/");
});

it("handles add filter action", () => {
    expect.assertions(4);

    const add1 = fileBrowserReducer(INITIAL_STATE, {
        type: ACTION.ADD_FILTER,
        tag: "tag1",
    });

    expect(add1).not.toBe(INITIAL_STATE);
    expect(add1.filters).toEqual(["tag1"]);
    
    const add2 = fileBrowserReducer(add1, {
        type: ACTION.ADD_FILTER,
        tag: "tag2",
    });

    expect(add2).not.toBe(add1);
    expect(add2.filters).toEqual(["tag1", "tag2"]);
});

it("handles remove filter action", () => {
    const initialState = {
        ...INITIAL_STATE,
        filters: ["tag1", "tag2"],
    };

    expect.assertions(4);

    const remove1 = fileBrowserReducer(initialState, {
        type: ACTION.REMOVE_FILTER,
        tag: "tag1",
    });

    expect(remove1).not.toBe(INITIAL_STATE);
    expect(remove1.filters).toEqual(["tag2"]);
    
    const remove2 = fileBrowserReducer(remove1, {
        type: ACTION.REMOVE_FILTER,
        tag: "tag2",
    });

    expect(remove2).not.toBe(remove1);
    expect(remove2.filters).toEqual([]);
});

it("handles select file action", () => {
    expect.assertions(2);

    const newState = fileBrowserReducer(INITIAL_STATE, {
        type: ACTION.SELECT_FILE,
        path: "/file1",
    });

    expect(newState).not.toBe(INITIAL_STATE);
    expect(newState.selected).toEqual("/file1");
});
