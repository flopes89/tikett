import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "bootstrap";
import "./style/main.scss";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";
import { DragDropContext } from "react-beautiful-dnd";
import { onDragEnd } from "./responders";

const client = new ApolloClient({
    uri: "/graphql",
})

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const root = document.getElementById("react-root");
ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <DragDropContext onDragEnd={onDragEnd(client, store)}>
                <App />
            </DragDropContext>
        </Provider>
    </ApolloProvider>
    , root);

if (process.env.NODE_ENV === "development") {
    const livereloadScript = document.createElement("script");
    livereloadScript.src = "http://localhost:35729/livereload.js";
    document.body.appendChild(livereloadScript);
}
