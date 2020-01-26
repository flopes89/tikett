import { TagGroup } from "../tags";
import { Dispatch, Reducer } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Store } from ".";

export enum ACTION {
    SET_ROOT,
    ADD_GROUP,
    REMOVE_GROUP,
    MOVE_TAG,
};

export type SetRootAction = {
    type: ACTION.SET_ROOT;
    root: string;
};

export type AddGroupAction = {
    type: ACTION.ADD_GROUP;
    name: string;
};

export type RemoveGroupAction = {
    type: ACTION.REMOVE_GROUP;
    name: string;
};

export type MoveTagAction = {
    type: ACTION.MOVE_TAG;
    tagName: string;
    groupName: string;
};

export type DbAction =
    SetRootAction
    | AddGroupAction
    | RemoveGroupAction
    | MoveTagAction
    ;

export type DbState = {
    root: string;
    groups: TagGroup[];
};

const defaultDbState: DbState = {
    root: "",
    groups: []
};

export const buildDbActions = (dispatch: Dispatch<DbAction>) => ({
    setRoot: (root: string): SetRootAction => dispatch({
        type: ACTION.SET_ROOT,
        root,
    }),
});

export const dbReducer: Reducer<DbState, DbAction> = (prev, action) => {
    const state: DbState = { ...defaultDbState, ...prev };

    switch (action.type) {
        case ACTION.SET_ROOT:
            return {
                ...state,
                root: action.root,
            };

        default:
            return state;
    }
};

export const useDb = () => {
    const db = useSelector((state: Store) => state.db);
    const dispatch = useDispatch();
    return {
        ...db,
        ...buildDbActions(dispatch)
    }
};
