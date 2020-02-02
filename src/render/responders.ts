import { ACTION as DRAG_ACTION } from "./state/drag";
import { ACTION as FILE_ACTION } from "./state/fileBrowser";
import { ACTION as TAG_ACTION } from "./state/tags";
import { DragDropContextProps } from "react-beautiful-dnd";
import { Store } from "redux";
import { addTagToFile } from "./operations/files";

export const onBeforeDragStart: (store: Store) => DragDropContextProps["onBeforeDragStart"] = (store) => () => {
    store.dispatch({
        type: DRAG_ACTION.START_TAG_DRAG,
    });
};

export const onDragEnd: (store: Store) => DragDropContextProps["onDragEnd"] = (store) => (dropResult) => {
    if (!dropResult.destination) {
        store.dispatch({
            type: DRAG_ACTION.END_TAG_DRAG,
        });
        return;
    }

    const destParts = dropResult.destination.droppableId.split("|");
    const destType = destParts[0];
    const destName = destParts[1];

    const source = dropResult.draggableId;

    if (destType === "file") {
        addTagToFile(source, destName)
            .then(() => {
                store.dispatch({
                type: FILE_ACTION.UPDATE_REFETCH,
            })
        });
    } else if (destType === "tagGroup") {
        store.dispatch({
            type: TAG_ACTION.MOVE_TAG,
            tagName: source,
            groupName: destName,
        });
    } else if (destType === "filter") {
        store.dispatch({
            type: FILE_ACTION.ADD_FILTER,
            tag: source,
        });
    }

    store.dispatch({
        type: DRAG_ACTION.END_TAG_DRAG,
    });
};
