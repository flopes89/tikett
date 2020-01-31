import { Reducer } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Store } from ".";

enum ACTION {
    ADD_GROUP = "ADD_GROUP",
    REMOVE_GROUP = "REMOVE_GROUP",
    MOVE_TAG = "MOVE_TAG",
    CHANGE_COLOR = "CHANGE_COLOR",
}

type AddGroupAction = {
    type: ACTION.ADD_GROUP;
    name: string;
};

type RemoveGroupAction = {
    type: ACTION.REMOVE_GROUP;
    name: string;
};

type MoveTagAction = {
    type: ACTION.MOVE_TAG;
    tagName: string;
    groupName: string;
};

type ChangeColorAction = {
    type: ACTION.CHANGE_COLOR;
    name: string;
    color: string;
};

type TagsAction =
    AddGroupAction
    | RemoveGroupAction
    | MoveTagAction
    | ChangeColorAction
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

export const useTagsState = () => {
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

        changeColor: (name: string, color: string): ChangeColorAction => dispatch({
            type: ACTION.CHANGE_COLOR,
            name,
            color,
        }),
    };
};

// Get a flat list of all tags in all groups
export const useFlatTagList = (): string[] => {
    const { groups } = useTagsState();
    return Array.prototype.concat(groups.map(group => group.tags));
};

// Get a map between tagname => color
// based on the current tag groups and their colors
export const useTagColorMap = (): Map<string, string> => {
    const { groups } = useTagsState();
    const map = new Map<string, string>();
    groups.forEach(group => group.tags.forEach(tag => map.set(tag, group.color)));
    return map;
};
