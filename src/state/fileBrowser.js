const SHOWDESC_TOGGLE = "SHOWDESC_TOGGLE";
const OPEN_FOLDER = "OPEN_FOLDER";

export const toggleShowDescendants = () => ({
    type: SHOWDESC_TOGGLE,
});

export const openFolder = (folder) => ({
    type: OPEN_FOLDER,
    folder,
});

export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SHOWDESC_TOGGLE:
            return {
                ...newState,
                showDescendants: !newState.showDescendants,
            };

        case OPEN_FOLDER:
            let newCurrent = newState.files_currentFolder;

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
};
