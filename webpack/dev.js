const base = require("./base.js");
const LivereloadPlugin = require("webpack-livereload-plugin");

module.exports = {
    ...base,
    watch: true,
    devtool: "source-map",
    plugins: [
        new LivereloadPlugin(),
    ]
};
