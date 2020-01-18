"use strict";

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const base = require("./base");

module.exports = merge.smart(base, {
    target: "electron-main",
    entry: path.resolve(__dirname, "..", "src", "main", "index.ts"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            { targets: "last 1 electron version" },
                        ],
                        "@babel/preset-typescript"
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        })
    ]
});
