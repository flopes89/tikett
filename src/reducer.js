export const NEWTAGGROUP_OPEN = "NEWTAGGROUP_OPEN";
export const NEWTAGGROUP_ABORT = "NEWTAGGROUP_ABORT";
export const NEWTAGGROUP_CONFIRM = "NEWTAGGROUP_CONFIG";
export const NEWTAGGROUP_CHANGE = "NEWTAGGROUP_CHANGE";
export const FILES_TOGGLE_SHOWDESCENDANTS = "FILES_TOGGLE_SHOWDESCENDANTS";
export const FILES_OPENFOLDER = "FILES_OPENFOLDER";

export const INIT_STATE = {
    tagGroups: {
        createNewOpened: false,
        createNewName: "",
    },
    files: {
        showDescendants: false,
        current: "/",
    },
};

export default (state_, action_) => {
    const newState = Object.assign({}, INIT_STATE, state_);

    switch (action_.type) {
        case NEWTAGGROUP_OPEN:
            return {
                ...newState,
                tagGroups: {
                    ...newState.tagGroups,
                    createNewOpened: true,
                },
            };

        case NEWTAGGROUP_ABORT:
            return {
                ...newState,
                tagGroups: {
                    ...newState.tagGroups,
                    createNewOpened: false,
                },
            };

        case NEWTAGGROUP_CONFIRM:
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

        case NEWTAGGROUP_CHANGE:
            return {
                ...newState,
                tagGroups: {
                    ...newState.tagGroups,
                    createNewName: action_.name,
                },
            };

        case FILES_TOGGLE_SHOWDESCENDANTS:
            return {
                ...newState,
                files: {
                    ...newState.files,
                    showDescendants: !newState.files.showDescendants,
                }
            }

        case FILES_OPENFOLDER:
            let newCurrent = newState.files.current;

            if (action_.folder.indexOf("/") === 0) {
                newCurrent = action_.folder;
            } else if (action_.folder === "..") {
                if (newCurrent === "/") {
                    newCurrent = "/";
                } else {
                    const parts = newCurrent.split("/");
                    parts.splice(-2, 2);
                    newCurrent = parts.join("/") + "/";
                }
            } else {
                newCurrent += action_.folder + "/";
            }

            return {
                ...newState,
                files: {
                    ...newState.files,
                    current: newCurrent,
                }
            };
    }

    return INIT_STATE;
};
