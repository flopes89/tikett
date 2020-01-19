// Used for jest only, main/render is transpiled with webpack

module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                }
            }
        ],
        "@babel/preset-typescript",
    ]
};
