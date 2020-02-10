import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap";
import "./style/main.scss";
import App from "./app";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { onBeforeDragStart, onDragEnd } from "./responders";
import { store } from "./state";

const client = new ApolloClient({
    uri: "/graphql",
})

const appElement = document.createElement("div");
document.body.appendChild(appElement);

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <DragDropContext onBeforeDragStart={onBeforeDragStart(store)} onDragEnd={onDragEnd(client, store)}>
                <App />
            </DragDropContext>
        </Provider>
    </ApolloProvider>
    , appElement);
