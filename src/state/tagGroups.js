export const NAME_TOGGLE = "NAME_TOGGLE";
export const NAME_CHANGE = "NAME_CHANGE";

export const toggleName = (groupName) => ({
    type: NEWTAG_TOGGLE,
    groupName,
});

export const changeName = (groupName, newName) => ({
    type: NEWTAG_CHANGE,
    groupName,
    newName
});

export default files = (state = {}, action) => {
    const newState = Object.assign({}, state);

    if (!action.groupName) {
        return;
    }

    const key = action.groupName + "_" + action.type;

    switch (action.type) {
        case NEWTAG_TOGGLE:
            return {
                ...newState,
                [key]: !newState[key],
            };

        case NEWTAG_CHANGE:
            return {
                ...newState,
                [key]: action.newName,
            };
    }
};
