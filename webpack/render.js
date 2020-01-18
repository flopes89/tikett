"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const base = require("./base");

module.exports = merge.smart(base, {
    target: "electron-renderer",
    entry: {
        app: [ "@babel/polyfill", path.resolve(__dirname, "..", "src", "render", "index.tsx") ],
    },
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
                            { targets: "last 1 electron version" }
                        ],
                        "@babel/preset-typescript",
                        "@babel/preset-react"
                    ],
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            disable: true
                        }
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        })
    ]
});
