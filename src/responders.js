import queries from "./queries";

export const onDragEnd = (client_, store_) => (dropResult_) => {
    if (!dropResult_.destination) {
        return;
    }

    const destParts = dropResult_.destination.droppableId.split("|");
    const destType = destParts[0];
    const destName = destParts[1];

    const tagParts = dropResult_.draggableId.split("|");
    const tagName = tagParts[2];

    const state = store_.getState();

    if (destType === "file") {
        client_.mutate({
            mutation: queries.ADD_TAG,
            variables: {
                path: destName,
                name: tagName,
            },
            refetchQueries: [
                {
                    query: queries.GET_FILES,
                    variables: {
                        current: state.fileBrowser.currentFolder,
                        showDescendants: state.fileBrowser.showDescendants,
                    }
                }
            ]
        })
    } else if (destType === "tagGroup") {
        client_.mutate({
            mutation: queries.MOVE_TAG,
            variables: {
                tag: tagName,
                group: destName,
            },
            refetchQueries: [
                {
                    query: queries.GET_TAG_GROUPS
                }
            ]
        })
    }
};
