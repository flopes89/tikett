import { combineReducers, createStore, compose } from "redux";
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers());

export const persistor = persistStore(store);
