const { smart } = require("webpack-merge");
const NodemonPlugin = require("nodemon-webpack-plugin");
const base = require( "./server.base");

module.exports = smart(base, {
    mode: "development",
    watch: true,
    plugins: [
        new NodemonPlugin()
    ]
});
