import { ACTION as DRAG_ACTION } from "./state/drag";
import { ACTION as FILE_ACTION } from "./state/fileBrowser";
import { DragDropContextProps } from "react-beautiful-dnd";
import { Store } from "redux";
import { Store as State } from "./state";
import { ApolloClient } from "apollo-boost";
import { AddTagDocument, MoveTagDocument, FilesDocument, TagGroupsDocument, TagsDocument } from "../generated/graphql";

export const onBeforeDragStart: (store: Store) => DragDropContextProps["onBeforeDragStart"] = (store) => () => {
    store.dispatch({
        type: DRAG_ACTION.START_TAG_DRAG,
    });
};

export const onDragEnd: (client: ApolloClient<any>, store: Store) => DragDropContextProps["onDragEnd"] =
(client, store) => (dropResult) => {
    if (!dropResult.destination) {
        store.dispatch({
            type: DRAG_ACTION.END_TAG_DRAG,
        });
        return;
    }

    const destParts = dropResult.destination.droppableId.split("|");
    const destType = destParts[0];
    const destName = destParts[1];

    const source = dropResult.draggableId.split("|");

    const state = store.getState() as State;

    if (destType === "file") {
        client.mutate({
            mutation: AddTagDocument,
            variables: {
                path: destName,
                tag: source[0],
            },
            refetchQueries: [{
                query: FilesDocument,
                variables: {
                    current: state.fileBrowser.currentFolder,
                    showDescendants: state.fileBrowser.showDescendants,
                    filters: state.fileBrowser.filters,
                }
            }]
        });
    } else if (destType === "tagGroup") {
        client.mutate({
            mutation: MoveTagDocument,
            variables: {
                tag: source[0],
                group: destName,
            },
            refetchQueries: [{
                query: TagGroupsDocument,
            }, {
                query: TagsDocument,
            }]
        });
    } else if (destType === "filter") {
        store.dispatch({
            type: FILE_ACTION.ADD_FILTER,
            tag: source[0],
        });
    }

    store.dispatch({
        type: DRAG_ACTION.END_TAG_DRAG,
    });
};
