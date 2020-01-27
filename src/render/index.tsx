import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap";
import "./style/main.scss";
import App from "./app";
import { Provider } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { onBeforeDragStart, onDragEnd } from "./responders";
import { store, persistor } from "./state";
import { PersistGate } from "redux-persist/integration/react";

const appElement = document.createElement("div");
document.body.appendChild(appElement);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={onDragEnd}>
                <App />
            </DragDropContext>
        </PersistGate>
    </Provider>
    , appElement);
