
const webpack = require("webpack");
const path = require("path");

module.exports = {
    output: {
        path: path.resolve(__dirname, "..", "dist"),
        filename: "[name].js"
    },
    node: {
        // Make __dir/filename relative to the transpiled output files
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
            "process.env.BUILD_INFO": JSON.stringify(
                (process.env.TRAVIS_BUILD_ID || "dev")
                + "."
                + (process.env.TRAVIS_COMMIT || "0")
            )
        })
    ]
};
