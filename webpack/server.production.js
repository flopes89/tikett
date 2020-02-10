const { smart } = require("webpack-merge");
const base = require("./server.base");

module.exports = smart(base, {
    mode: "production",
});
