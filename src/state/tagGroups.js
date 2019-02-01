const NAME_TOGGLE = "NAME_TOGGLE";
const NAME_CHANGE = "NAME_CHANGE";
const COLOR_TOGGLE = "COLOR_TOGGLE";
const COLOR_CHANGE = "COLOR_CHANGE";

export const toggleName = (groupName) => ({
    type: NAME_TOGGLE,
    groupName,
});

export const changeName = (groupName, newName) => ({
    type: NAME_CHANGE,
    groupName,
    newName
});

export const toggleColor = (groupName) => ({
    type: COLOR_TOGGLE,
    groupName,
});

export const changeColor = (groupName, color) => ({
    type: COLOR_CHANGE,
    groupName,
    color,
});

export const getNameOpenPropName = (groupName) => (groupName + "_name_open");
export const getNamePropName = (groupName) => (groupName + "_name");
export const getColorOpenPropName = (groupName) => (groupName + "_color_open");
export const getColorPropName = (groupName) => (groupName + "_color");

export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    if (!action.groupName) {
        return newState;
    }

    switch (action.type) {
        case NAME_TOGGLE:
            return {
                ...newState,
                [getNameOpenPropName(action.groupName)]: !newState[getNameOpenPropName(action.groupName)],
            };

        case NAME_CHANGE:
            return {
                ...newState,
                [getNamePropName(action.groupName)]: action.newName,
            };

        case COLOR_TOGGLE:
            return {
                ...newState,
                [getColorOpenPropName(action.groupName)]: !newState[getColorOpenPropName(action.groupName)],
            };

        case COLOR_CHANGE:
            let color = action.color;
            if (typeof action.color === "object") {
                color = action.color.hex;
            }

            return {
                ...newState,
                [getColorPropName(action.groupName)]: color,
            };
    }

    return newState;
};
