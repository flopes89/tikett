import { Reducer } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Store } from ".";

export enum ACTION {
    SET_ROOT,
    TOGGLE_DESCENDANTS,
    OPEN_FOLDER,
    ADD_FILTER,
    REMOVE_FILTER,
    SELECT_FILE,
};

export type SetRootAction = {
    type: ACTION.SET_ROOT;
    root: string;
};

export type ToggleDescendantsAction = {
    type: ACTION.TOGGLE_DESCENDANTS;
};

export type OpenFolderAction = {
    type: ACTION.OPEN_FOLDER;
    folder: string;
};

export type AddFilterAction = {
    type: ACTION.ADD_FILTER;
    tag: string;
};

export type RemoveFilterAction = {
    type: ACTION.REMOVE_FILTER;
    tag: string;
};

export type SelectFileAction = {
    type: ACTION.SELECT_FILE;
    path: string;
};

export type FileBrowserAction = 
    SetRootAction
    | ToggleDescendantsAction
    | OpenFolderAction
    | AddFilterAction
    | RemoveFilterAction
    | SelectFileAction
    ;

export type FileBrowserState = {
    root: string;
    currentFolder: string;
    showDescendants: boolean;
    filters: string[];
    selected: string;
};

const defaultState: FileBrowserState = {
    root: "",
    currentFolder: "/",
    showDescendants: false,
    filters: [],
    selected: "",
};

export const fileBrowserReducer: Reducer<FileBrowserState, FileBrowserAction> = (prev, action) => {
    const state = { ...defaultState, ...prev };

    switch (action.type) {
        case ACTION.SET_ROOT:
            return {
                ...state,
                root: action.root,
            };

        case ACTION.TOGGLE_DESCENDANTS:
            return {
                ...state,
                showDescendants: !state.showDescendants,
            };

        case ACTION.OPEN_FOLDER:
            let newCurrent = state.currentFolder;

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
                ...state,
                currentFolder: newCurrent,
            };

        case ACTION.ADD_FILTER:
            return {
                ...state,
                filters: [...state.filters, action.tag],
            };

        case ACTION.REMOVE_FILTER:
            const filters = state.filters.slice();
            filters.splice(filters.indexOf(action.tag), 1);

            return {
                ...state,
                filters,
            };

        case ACTION.SELECT_FILE:
            return {
                ...state,
                selected: action.path,
            };
        
        default:
            return state;
    }
};

export const useFileBrowserState = () => {
    const state = useSelector((state: Store) => state.fileBrowser);
    const dispatch = useDispatch();
    return {
        ...state,
        setRoot: (root: string): SetRootAction => dispatch({
            type: ACTION.SET_ROOT,
            root,
        }),
    
        toggleDescendants: () => dispatch({
            type: ACTION.TOGGLE_DESCENDANTS,
        }),
    
        openFolder: (folder: string) => dispatch({
            type: ACTION.OPEN_FOLDER,
            folder,
        }),
    
        addFilter: (tag: string) => dispatch({
            type: ACTION.ADD_FILTER,
            tag,
        }),
    
        removeFilter: (tag: string) => dispatch({
            type: ACTION.REMOVE_FILTER,
            tag,
        }),
    
        selectFile: (path: string) => dispatch({
            type: ACTION.SELECT_FILE,
            path,
        }),
    };
};
