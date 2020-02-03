import { useSelector, useDispatch } from "react-redux";
import { Store } from ".";
import { Reducer } from "redux";
import { cloneDeep } from "lodash";

export enum ACTION {
    START_TAG_DRAG = "START_TAG_DRAG",
    END_TAG_DRAG = "END_TAG_DRAG",
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

export type DragState = {
    isDraggingTag: boolean;
};

const defaultState: DragState = {
    isDraggingTag: false,
};

export const dragReducer: Reducer<DragState, TagAction> = (prev, action) => {
    const state: DragState = cloneDeep(prev) || defaultState;

    if (action.type === ACTION.START_TAG_DRAG) {
        return {
            ...state,
            isDraggingTag: true,
        };
    }

    if (action.type === ACTION.END_TAG_DRAG) {
        return {
            ...state,
            isDraggingTag: false,
        };
    }

    return state;
};

export const useDragState = () => {
    const state = useSelector((state: Store) => state.drag);
    const dispatch = useDispatch();
    return {
        ...state,
        startTagDrag: () => dispatch({
            type: ACTION.START_TAG_DRAG,
        }),
        
        endTagDrag: () => dispatch({
            type: ACTION.END_TAG_DRAG,
        }),
    }
};
