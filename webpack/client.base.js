const { NamedModulesPlugin } = require("webpack");
const { smart } = require("webpack-merge");
const { resolve } = require("path");
const base = require("./base");

module.exports = smart(base, {
    entry: {
        client: [ "@babel/polyfill", resolve(__dirname, "..", "src", "client", "index.tsx") ],
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
                loader: "file-loader",
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new NamedModulesPlugin(),
    ]
});
