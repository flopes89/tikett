"use strict";

const merge = require("webpack-merge");

const base = require("./render");

module.exports = merge.smart(base, {
    mode: "production",
});
