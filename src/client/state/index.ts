import { combineReducers, createStore, compose } from "redux";
import { dragReducer, DragState } from "./drag";
import { FileBrowserState, fileBrowserReducer } from "./fileBrowser";

export type Store = {
    drag: DragState,
    fileBrowser: FileBrowserState,
};

const reducer = combineReducers({
    drag: dragReducer,
    fileBrowser: fileBrowserReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers());
