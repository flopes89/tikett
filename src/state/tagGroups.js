export const NAME_TOGGLE = "NAME_TOGGLE";
export const NAME_CHANGE = "NAME_CHANGE";

export const toggleName = (groupName) => ({
    type: NAME_TOGGLE,
    groupName,
});

export const changeName = (groupName, newName) => ({
    type: NAME_CHANGE,
    groupName,
    newName
});

export const getOpenPropName = (groupName) => (groupName + "_open");
export const getNamePropName = (groupName) => (groupName + "_name");

export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    if (!action.groupName) {
        return newState;
    }

    switch (action.type) {
        case NAME_TOGGLE:
            return {
                ...newState,
                [getOpenPropName(action.groupName)]: !newState[getOpenPropName(action.groupName)],
            };

        case NAME_CHANGE:
            return {
                ...newState,
                [getNamePropName(action.groupName)]: action.newName,
            };
    }

    return newState;
};
