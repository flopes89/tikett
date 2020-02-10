const { DefinePlugin } = require("webpack");
const nodeExternals = require("webpack-node-externals");
const { smart } = require("webpack-merge");
const { resolve } = require("path");
const base = require("./base");

module.exports = smart(base, {
    target: "node",
    externals: [nodeExternals()],
    entry: {
        server: resolve(__dirname, "..", "src", "server", "index.ts"),
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
                            { targets: { "node": 12 } }
                        ],
                    ],
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
            "process.env.BUILD_INFO": JSON.stringify(
                (process.env.TRAVIS_BUILD_ID || "dev")
                + "."
                + (process.env.TRAVIS_COMMIT || "0")
            )
        })
    ]
});
