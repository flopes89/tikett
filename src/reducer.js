export const NEWTAGGROUP_OPEN = "NEWTAGGROUP_OPEN";
export const NEWTAGGROUP_ABORT = "NEWTAGGROUP_ABORT";
export const NEWTAGGROUP_CONFIRM = "NEWTAGGROUP_CONFIRM";
export const NEWTAGGROUP_CHANGE = "NEWTAGGROUP_CHANGE";
export const FILES_TOGGLE_SHOWDESCENDANTS = "FILES_TOGGLE_SHOWDESCENDANTS";
export const FILES_OPENFOLDER = "FILES_OPENFOLDER";
export const FILES_NEWTAG_OPEN = "NEWTAG_OPEN";
export const FILES_NEWTAG_ABORT = "NEWTAG_ABORT";
export const FILES_NEWTAG_CONFIRM = "NEWTAG_CONFIRM";
export const FILES_NEWTAG_CHANGE = "NEWTAG_CHANGE";
export const CONFIG_ROOT_OPEN = "CONFIG_ROOT_OPEN";
export const CONFIG_ROOT_ABORT = "CONFIG_ROOT_ABORT";
export const CONFIG_ROOT_CHANGE = "CONFIG_ROOT_CHANGE";
export const CONFIG_ROOT_CONFIRM = "CONFIG_ROOT_CONFIRM";

export const INIT_STATE = {
    config: {
        root: "",
        rootOpened: false,
    },
    tagGroups: {
        createNewOpened: false,
        createNewName: "",
    },
    files: {
        showDescendants: false,
        current: "/",
        createNewTagOpened: false,
        createNewTagName: "",
        createNewTagOnFile: "",
    },
};

export default (state, action) => {
    const newState = Object.assign({}, INIT_STATE, state);

    switch (action.type) {
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
                    createNewName: action.name,
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
                files: {
                    ...newState.files,
                    current: newCurrent,
                }
            };

        case FILES_NEWTAG_OPEN:
            return {
                ...newState,
                files: {
                    ...newState.files,
                    createNewTagOnPath: action.path,
                    createNewTagOpened: true,
                },
            };

        case FILES_NEWTAG_ABORT:
            return {
                ...newState,
                files: {
                    ...newState.files,
                    createNewTagOpened: false,
                },
            };

        case FILES_NEWTAG_CHANGE:
            return {
                ...newState,
                files: {
                    ...newState.files,
                    createNewTagName: action.name,
                },
            };

        case FILES_NEWTAG_CONFIRM:
            return {
                ...newState,
                files: {
                    ...newState.files,
                    createNewTagName: "",
                },
            };

        case CONFIG_ROOT_OPEN:
            return {
                ...newState,
                config: {
                    ...newState.config,
                    rootOpened: true,
                }
            };

        case CONFIG_ROOT_ABORT:
            return {
                ...newState,
                config: {
                    ...newState.config,
                    rootOpened: false,
                }
            };

        case CONFIG_ROOT_CHANGE:
            return {
                ...newState,
                config: {
                    ...newState.config,
                    root: action.root,
                }
            };

        case CONFIG_ROOT_CONFIRM:
            return {
                ...newState,
                config: {
                    ...newState.config,
                    rootOpened: false,
                }
            };

    }

    return INIT_STATE;
};
