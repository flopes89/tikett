import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { DbState, dbReducer } from "./db";
import createElectronStorage from "redux-persist-electron-storage";
import { tagReducer, TagState } from "./global";
import { FileBrowserState, fileBrowserReducer } from "./fileBrowser";

export type Store = {
    db: DbState;
    tag: TagState,
    fileBrowser: FileBrowserState,
};

const reducer = combineReducers({
    db: dbReducer,
    tag: tagReducer,
    fileBrowser: fileBrowserReducer,
});

const persistConfig = {
    key: "root",
    storage: createElectronStorage(),
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
