import { Dispatch } from "redux";
import { Reducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store } from ".";

export enum ACTION {
    START_TAG_DRAG,
    END_TAG_DRAG,
};

export type StartTagDragAction = {
    type: ACTION.START_TAG_DRAG;
};

export type EndTagDragAction = {
    type: ACTION.END_TAG_DRAG;
};

export type TagAction =
    StartTagDragAction
    | EndTagDragAction
    ;

export type TagState = {
    isDraggingTag: boolean;
};

const defaultTagState: TagState = {
    isDraggingTag: false,
};

export const buildTagActions = (dispatch: Dispatch<TagAction>) => ({
    startTagDrag: () => dispatch({
        type: ACTION.START_TAG_DRAG,
    }),
    
    endTagDrag: () => dispatch({
        type: ACTION.END_TAG_DRAG,
    }),
});

export const tagReducer: Reducer<TagState, TagAction> = (prev, action) => {
    const state = { ...defaultTagState, ...prev };

    switch (action.type) {
        case ACTION.START_TAG_DRAG:
            return {
                ...state,
                isDraggingTag: true,
            };

        case ACTION.END_TAG_DRAG:
            return {
                ...state,
                isDraggingTag: false,
            };

        default:
            return state;
    }
};

export const useTagState = () => {
    const tagState = useSelector((state: Store) => state.tag);
    const dispatch = useDispatch();
    return {
        ...tagState,
        ...buildTagActions(dispatch)
    }
};
