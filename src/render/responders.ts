import { useDragState } from "./state/drag";
import { useFileBrowserState } from "./state/fileBrowser";
import { DropResult, DragDropContextProps } from "react-beautiful-dnd";

export const onBeforeDragStart: DragDropContextProps["onBeforeDragStart"] = () => {
    const { startTagDrag } = useDragState();
    startTagDrag();
};

export const onDragEnd: DragDropContextProps["onDragEnd"] = (dropResult) => {
    const { addFilter } = useFileBrowserState();
    const { endTagDrag } = useDragState();

    if (!dropResult.destination) {
        endTagDrag();
        return;
    }

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

    endTagDrag();
};
