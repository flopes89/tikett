import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import createElectronStorage from "redux-persist-electron-storage";
import { dragReducer, DragState } from "./drag";
import { FileBrowserState, fileBrowserReducer } from "./fileBrowser";
import { TagsState, tagsReducer } from "./tags";

export type Store = {
    tags: TagsState;
    drag: DragState,
    fileBrowser: FileBrowserState,
};

const persistConfig = {
    key: "root",
    storage: createElectronStorage(),
};

const reducer = combineReducers({
    drag: dragReducer,
    tags: persistReducer(persistConfig, tagsReducer),
    fileBrowser: persistReducer(persistConfig, fileBrowserReducer),
});

export const store = createStore(reducer);
export const persistor = persistStore(store);
