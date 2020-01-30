import { ACTION as DRAG_ACTION } from "./state/drag";
import { ACTION as FILE_ACTION } from "./state/fileBrowser";
import { DragDropContextProps } from "react-beautiful-dnd";
import { Store } from "redux";

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

    const addFilter = (tag: string) => store.dispatch({
        type: FILE_ACTION.ADD_FILTER,
        tag,
    });

    const destParts = dropResult.destination.droppableId.split("|");
    const destType = destParts[0];
    const destName = destParts[1];

    const tagParts = dropResult.draggableId.split("|");
    const tagName = tagParts[0];
    const tagColor = tagParts[1];

    if (destType === "file") {
        // client_.mutate({
        //     mutation: queries.ADD_TAG,
        //     variables: {
        //         path: destName,
        //         name: tagName,
        //     },
        //     refetchQueries: [
        //         {
        //             query: queries.GET_FILES,
        //             variables: {
        //                 current: state.fileBrowser.currentFolder,
        //                 showDescendants: state.fileBrowser.showDescendants,
        //             }
        //         }
        //     ]
        // })
    } else if (destType === "tagGroup") {
        // client_.mutate({
        //     mutation: queries.MOVE_TAG,
        //     variables: {
        //         tag: tagName,
        //         group: destName,
        //     },
        //     refetchQueries: [
        //         {
        //             query: queries.GET_TAG_GROUPS
        //         }
        //     ]
        // })
    } else if (destType === "filter") {
        addFilter(`${tagName}#${tagColor}`);
    }

    store.dispatch({
        type: DRAG_ACTION.END_TAG_DRAG,
    });
};
