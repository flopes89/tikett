const ADDTAG_TOGGLE = "ADDTAG_TOGGLE";
const ADDTAG_CHANGE = "ADDTAG_CHANGE";
const SELECT_FILE = "SELECT_FILE";

export const toggleAddTag = (path) => ({
    type: ADDTAG_TOGGLE,
    path,
});

export const changeAddTag = (path, tagName) => ({
    type: ADDTAG_CHANGE,
    path,
    tagName,
});

export const selectFile = (path) => ({
    type: SELECT_FILE,
    path,
});

export const getAddTagOpenPropName = (path) => (path + "_addTag_open");
export const getAddTagNamePropName = (path) => (path + "_addTag_name");

export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case ADDTAG_TOGGLE:
            if (!action.path) {
                return newState;
            }

            if (action.path === newState.selected) {
                newState.selected = "";
            }

            return {
                ...newState,
                [getAddTagOpenPropName(action.path)]: !newState[getAddTagOpenPropName(action.path)],
            };

        case ADDTAG_CHANGE:
            if (!action.path) {
                return newState;
            }

            return {
                ...newState,
                [getAddTagNamePropName(action.path)]: action.tagName,
            };

        case SELECT_FILE:
            return {
                ...newState,
                selected: action.path,
            };
    }

    return newState;
};
