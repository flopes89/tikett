const { smart } = require("webpack-merge");
const base = require("./client.base");

module.exports = smart(base, {
    mode: "production",
});
