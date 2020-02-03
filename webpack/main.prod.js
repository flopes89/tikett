"use strict";

const merge = require("webpack-merge");

const base = require("./main");

module.exports = merge.smart(base, {
    mode: "production",
});
