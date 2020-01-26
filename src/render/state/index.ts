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

const reducer = combineReducers({
    drag: dragReducer,
    tags: tagsReducer,
    fileBrowser: fileBrowserReducer,
});

const persistConfig = {
    key: "root",
    storage: createElectronStorage(),
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
