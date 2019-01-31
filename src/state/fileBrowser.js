const SHOWDESC_TOGGLE = "SHOWDESC_TOGGLE";
const OPEN_FOLDER = "OPEN_FOLDER";

export const toggleShowDescendants = () => ({
    type: SHOWDESC_TOGGLE,
});

export const openFolder = (folder) => ({
    type: OPEN_FOLDER,
    folder,
});

const INIT_STATE = {
    currentFolder: "/",
    showDescendants: false,
};

export default (state = INIT_STATE, action) => {
    const newState = Object.assign({}, INIT_STATE, state);

    switch (action.type) {
        case SHOWDESC_TOGGLE:
            return {
                ...newState,
                showDescendants: !newState.showDescendants,
            };

        case OPEN_FOLDER:
            let newCurrent = newState.currentFolder;

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
                currentFolder: newCurrent,
            };
    }

    return newState;
};
