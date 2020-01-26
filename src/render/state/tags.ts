import { Reducer } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Store } from ".";

export enum ACTION {
    ADD_GROUP,
    REMOVE_GROUP,
    MOVE_TAG,
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

export type TagsAction =
    AddGroupAction
    | RemoveGroupAction
    | MoveTagAction
    ;

export type TagGroup = {
    name: string;
    color: string;
    tags: string[];
};

export type TagsState = {
    groups: TagGroup[];
};

const defaultState: TagsState = {
    groups: []
};

export const tagsReducer: Reducer<TagsState, TagsAction> = (prev, action) => {
    const state = { ...defaultState, ...prev };

    switch (action.type) {
        case ACTION.ADD_GROUP:
            const newGroups = state.groups.slice();
            newGroups.push({
                name: action.name,
                tags: [],
                color: "#efefef",
            });

            return {
                ...state,
                groups: newGroups,
            };

        default:
            return state;
    }
};

export const useTags = () => {
    const state = useSelector((state: Store) => state.tags);
    const dispatch = useDispatch();
    return {
        ...state,
        addGroup: (name: string): AddGroupAction => dispatch({
            type: ACTION.ADD_GROUP,
            name,
        }),
    
        removeGroup: (name: string): RemoveGroupAction => dispatch({
            type: ACTION.REMOVE_GROUP,
            name
        }),
    
        moveTag: (tagName: string, groupName: string): MoveTagAction => dispatch({
            type: ACTION.MOVE_TAG,
            tagName,
            groupName,
        }),
    };
};
