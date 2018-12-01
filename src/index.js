import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "bootstrap";
import "./style/main.scss";

const root = document.getElementById("react-root");
ReactDOM.render(<App />, root);

if (process.env.NODE_ENV === "development") {
    const livereloadScript = document.createElement("script");
    livereloadScript.src = "http://localhost:35729/livereload.js";
    document.body.appendChild(livereloadScript);
}
