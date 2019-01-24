import queries from "./queries";

export const onDragEnd = (apolloClient_) => (dropResult_) => {
    if (!dropResult_.destination) {
        return;
    }

    console.log(dropResult_);

    const destParts = dropResult_.destination.droppableId.split("|");
    const destType = destParts[0];
    const destName = destParts[1];

    const tagParts = dropResult_.draggableId.split("|");
    const tagName = tagParts[2];

    console.log("Dropped [" + tagName + "] on [" + destType + "] [" + destName + "]");

    if (destType === "file") {
        apolloClient_.mutate({
            mutation: queries.ADD_TAG,
            variables: {
                path: destName,
                name: tagName,
            },
            refetchQueries: [
                {
                    query: queries.GET_FILES,
                    variables: {
                        current: "/", // TODO
                        showDescendants: false,
                    }
                }
            ]
        })
    }
};
