const ADDTAG_TOGGLE = "ADDTAG_TOGGLE";
const ADDTAG_CHANGE = "ADDTAG_CHANGE";

export const toggleAddTag = (path) => ({
    type: ADDTAG_TOGGLE,
    path,
});

export const changeAddTag = (path, tagName) => ({
    type: ADDTAG_CHANGE,
    path,
    tagName,
});

export const toggleShowDescendants = () => ({
    type: SHOWDESC_TOGGLE,
});

export const getAddTagOpenPropName = (path) => (path + "_addTag_open");
export const getAddTagNamePropName = (path) => (path + "_addTag_name");

export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    if (!action.path) {
        return newState;
    }

    switch (action.type) {
        case ADDTAG_TOGGLE:
            return {
                ...newState,
                [getAddTagOpenPropName(action.path)]: !newState[getAddTagOpenPropName(action.path)],
            };

        case ADDTAG_CHANGE:
            return {
                ...newState,
                [getAddTagNamePropName(action.path)]: action.tagName,
            };
    }

    return newState;
};
