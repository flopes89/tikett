import { Reducer } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Store } from ".";
import { cloneDeep } from "lodash";

export enum ACTION {
    SET_ROOT = "SET_ROOT",
    TOGGLE_DESCENDANTS = "TOGGLE_DESCENDANTS",
    OPEN_FOLDER = "OPEN_FOLDER",
    ADD_FILTER = "ADD_FILTER",
    REMOVE_FILTER = "REMOVE_FILTER",
    SELECT_FILE = "SELECT_FILE",
    UPDATE_REFETCH = "UPDATE_REFETCH",
}

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

export type UpdateRefetchAction = {
    type: ACTION.UPDATE_REFETCH;
};

export type FileBrowserAction = 
    SetRootAction
    | ToggleDescendantsAction
    | OpenFolderAction
    | AddFilterAction
    | RemoveFilterAction
    | SelectFileAction
    | UpdateRefetchAction
    ;

export type FileBrowserState = {
    root: string;
    currentFolder: string;
    showDescendants: boolean;
    filters: string[];
    selected: string;
    lastRefetch: Date;
};

const defaultState: FileBrowserState = {
    root: "",
    currentFolder: "/",
    showDescendants: false,
    filters: [],
    selected: "",
    lastRefetch: new Date(),
};

export const fileBrowserReducer: Reducer<FileBrowserState, FileBrowserAction> = (prev, action) => {
    const state = cloneDeep({ ...defaultState, ...prev });

    if (action.type === ACTION.UPDATE_REFETCH) {
        return {
            ...state,
            lastRefetch: new Date(),
        };
    }

    if (action.type === ACTION.SET_ROOT) {
        return {
            ...state,
            root: action.root,
            currentFolder: "/",
            showDescendants: false,
            filters: [],
            selected: "",
        };
    }

    if (action.type === ACTION.TOGGLE_DESCENDANTS) {
        return {
            ...state,
            showDescendants: !state.showDescendants,
        };
    }

    if (action.type === ACTION.OPEN_FOLDER) {
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
    }

    if (action.type === ACTION.ADD_FILTER) {
        return {
            ...state,
            filters: [...state.filters, action.tag].sort(),
        };
    }

    if (action.type === ACTION.REMOVE_FILTER) {
        const filters = state.filters.slice();
        filters.splice(filters.indexOf(action.tag), 1);

        return {
            ...state,
            filters,
        };
    }

    if (action.type === ACTION.SELECT_FILE) {
        return {
            ...state,
            selected: action.path,
        };
    }
    
    return state;
};

export const useFileBrowserState = () => {
    const state = useSelector((state: Store) => state.fileBrowser);
    const dispatch = useDispatch();
    
    return {
        ...state,

        updateRefetch: (): UpdateRefetchAction => dispatch({
            type: ACTION.UPDATE_REFETCH,
        }),

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
