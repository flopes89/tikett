import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { DbState, dbReducer } from "./db";
import createElectronStorage from "redux-persist-electron-storage";

export type Store = {
    db: DbState;
};

const reducer = combineReducers({
    db: dbReducer,
});

const persistConfig = {
    key: "root",
    storage: createElectronStorage(),
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
