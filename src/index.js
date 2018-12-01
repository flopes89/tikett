import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "bootstrap";
import "./style/main.scss";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: "/graphql",
})

const root = document.getElementById("react-root");
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , root);

if (process.env.NODE_ENV === "development") {
    const livereloadScript = document.createElement("script");
    livereloadScript.src = "http://localhost:35729/livereload.js";
    document.body.appendChild(livereloadScript);
}
