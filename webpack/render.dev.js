"use strict";

const merge = require("webpack-merge");

const base = require("./render");

module.exports = merge.smart(base, {
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    devServer: {
        port: 55668,
        compress: true,
        noInfo: true,
        stats: "errors-only",
        inline: true,
        hot: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        }
    }
});
