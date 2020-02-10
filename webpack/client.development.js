const { smart } = require("webpack-merge");
const base = require("./client.base");

module.exports = smart(base, {
    mode: "development",
    watch: true,
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
});
