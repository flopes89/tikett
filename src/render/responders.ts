import { startTagDrag, endTagDrag } from "./state/global";
import { addFilter } from "./state/fileBrowser";

export const onBeforeDragStart = (store_) => () => {
    store_.dispatch(startTagDrag());
};

export const onDragEnd = (store_) => (dropResult_) => {
    if (!dropResult_.destination) {
        store_.dispatch(endTagDrag());
        return;
    }

    const destParts = dropResult_.destination.droppableId.split("|");
    const destType = destParts[0];
    const destName = destParts[1];

    const tagParts = dropResult_.draggableId.split("|");
    const tagName = tagParts[0];
    const tagColor = tagParts[1];

    const state = store_.getState();

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
        store_.dispatch(addFilter(`${tagName}#${tagColor}`));
    }

    store_.dispatch(endTagDrag());
};
