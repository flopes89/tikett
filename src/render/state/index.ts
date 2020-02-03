import { combineReducers, createStore, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import stateReconciler from "redux-persist/lib/stateReconciler/hardSet";
import createElectronStorage from "redux-persist-electron-storage";
import { dragReducer, DragState } from "./drag";
import { FileBrowserState, fileBrowserReducer, FileBrowserAction } from "./fileBrowser";
import { TagsState, tagsReducer, TagsAction } from "./tags";

export type Store = {
    tags: TagsState;
    drag: DragState,
    fileBrowser: FileBrowserState,
};

const storage = createElectronStorage({
    electronStoreOpts: {
        name: "tikett",
    },
});

const reducer = combineReducers({
    drag: dragReducer,

    tags: persistReducer<TagsState, TagsAction>({
        key: "tags",
        version: 1,
        storage,
        stateReconciler
    }, tagsReducer),

    fileBrowser: persistReducer<FileBrowserState, FileBrowserAction>({
        key: "fileBrowser",
        version: 1,
        storage,
        stateReconciler
    }, fileBrowserReducer),
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers());

export const persistor = persistStore(store);
