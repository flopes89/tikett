import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import "bootstrap";
import "./style/main.scss";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./state";
import { DragDropContext } from "react-beautiful-dnd";
import { onBeforeDragStart, onDragEnd } from "./responders";

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const appElement = document.createElement("div");
document.body.appendChild(appElement);

ReactDOM.render(
    <Provider store={store}>
        <DragDropContext onBeforeDragStart={onBeforeDragStart(store)} onDragEnd={onDragEnd(store)}>
            <App />
        </DragDropContext>
    </Provider>
    , appElement);
