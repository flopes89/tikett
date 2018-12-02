export const OPEN_CREATE_NEW_TAG_GROUP_INPUT = "OPEN_CREATE_NEW_TAG_GROUP_INPUT";
export const ABORT_CREATE_NEW_TAG_GROUP_INPUT = "ABORT_CREATE_NEW_TAG_GROUP_INPUT";
export const CONFIRM_CREATE_NEW_TAG_GROUP_INPUT = "CONFIRM_CREATE_NEW_TAG_GROUP_INPUT";
export const CHANGE_CREATE_NEW_TAG_GROUP_INPUT = "CHANGE_CREATE_NEW_TAG_GROUP_INPUT";

export const INIT_STATE = {
    tagGroups: {
        createNewOpened: false,
        createNewName: "",
    },
};

export default (state_, action_) => {
    const newState = Object.assign({}, state_);

    switch (action_.type) {
        case OPEN_CREATE_NEW_TAG_GROUP_INPUT:
            return {
                ...newState,
                tagGroups: {
                    ...newState.tagGroups,
                    createNewOpened: true,
                },
            };

        case ABORT_CREATE_NEW_TAG_GROUP_INPUT:
            return {
                ...newState,
                tagGroups: {
                    ...newState.tagGroups,
                    createNewOpened: false,
                },
            };

        case CONFIRM_CREATE_NEW_TAG_GROUP_INPUT:
            if (!newState.tagGroups.createNewName) {
                return newState;
            }

            return {
                ...newState,
                tagGroups: {
                    ...newState.tagGroups,
                    createNewOpened: false,
                    createNewName: "",
                },
            };

        case CHANGE_CREATE_NEW_TAG_GROUP_INPUT:
            return {
                ...newState,
                tagGroups: {
                    ...newState.tagGroups,
                    createNewName: action_.name,
                },
            };
    }

    return INIT_STATE;
};
