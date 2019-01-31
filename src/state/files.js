export const ADDTAG_TOGGLE = "ADDTAG_TOGGLE";
export const ADDTAG_CHANGE = "ADDTAG_CHANGE";

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

export default files = (state = {}, action) => {
    const newState = Object.assign({}, state);

    if (!action.path) {
        return;
    }

    const key = action.path + "_" + action.type;

    switch (action.type) {
        case ADDTAG_TOGGLE:
            return {
                ...newState,
                [key]: !newState[key],
            };

        case ADDTAG_CHANGE:
            return {
                ...newState,
                [key]: action.tagName,
            };
    }
};
