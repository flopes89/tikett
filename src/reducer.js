export const OPEN_CREATE_NEW_TAG_GROUP_INPUT = "OPEN_CREATE_NEW_TAG_GROUP_INPUT";
export const CLOSE_CREATE_NEW_TAG_GROUP_INPUT = "CLOSE_CREATE_NEW_TAG_GROUP_INPUT";

export default (state_, action_) => {
    const newState = Object.assign({}, state_);

    switch (action_.type) {
        case OPEN_CREATE_NEW_TAG_GROUP_INPUT:
            return {
                ...newState,
                tagGroups: {
                    ...newState.tagGroups,
                    createNewInputOpened: true,
                },
            };

        case CLOSE_CREATE_NEW_TAG_GROUP_INPUT:
            return {
                ...newState,
                tagGroups: {
                    ...newState.tagGroups,
                    createNewInputOpened: false,
                },
            };
    }

    return newState;
};
