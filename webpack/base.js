const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "..", "src", "index.js"),
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "..", "public"),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require("precss"), require("autoprefixer")]
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    }
};
