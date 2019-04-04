const SHOWDESC_TOGGLE = "SHOWDESC_TOGGLE";
const OPEN_FOLDER = "OPEN_FOLDER";
const ADD_FILTER = "ADD_FILTER";
const REMOVE_FILTER = "REMOVE_FILTER";
const SELECT_FILE = "SELECT_FILE";

export const toggleShowDescendants = () => ({
    type: SHOWDESC_TOGGLE,
});

export const openFolder = (folder) => ({
    type: OPEN_FOLDER,
    folder,
});

export const addFilter = (tag) => ({
    type: ADD_FILTER,
    tag,
});

export const removeFilter = (index) => ({
    type: REMOVE_FILTER,
    index,
});

export const selectFile = (path) => ({
    type: SELECT_FILE,
    path,
});

const INIT_STATE = {
    currentFolder: "/",
    showDescendants: false,
    filters: [],
    selected: "",
};

export default (state = INIT_STATE, action) => {
    const newState = Object.assign({}, INIT_STATE, state);

    switch (action.type) {
        case SHOWDESC_TOGGLE:
            return {
                ...newState,
                showDescendants: !newState.showDescendants,
            };

        case OPEN_FOLDER:
            let newCurrent = newState.currentFolder;

            if (action.folder.indexOf("/") === 0) {
                newCurrent = action.folder;
            } else if (action.folder === "..") {
                if (newCurrent === "/") {
                    newCurrent = "/";
                } else {
                    const parts = newCurrent.split("/");
                    parts.splice(-2, 2);
                    newCurrent = parts.join("/") + "/";
                }
            } else {
                newCurrent += action.folder + "/";
            }

            return {
                ...newState,
                currentFolder: newCurrent,
            };

        case ADD_FILTER:
            return {
                ...newState,
                filters: [].concat(newState.filters, action.tag),
            };

        case REMOVE_FILTER:
            const filters = newState.filters.slice();
            filters.splice(action.index, 1);

            return {
                ...newState,
                filters,
            };

        case SELECT_FILE:
            return {
                ...newState,
                selected: action.path,
            };
    }

    return newState;
};
