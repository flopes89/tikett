const path = require("path");
const os = require("os");
const fs = require("fs");
const _ = require("lodash");

const CONFIG_PATH = path.resolve(os.homedir(), ".tikett.json");

const CONFIG_DEFAULTS = {
    root: ""
};

let CONFIG = _.cloneDeep(CONFIG_DEFAULTS);

const load = () => {
    if (!fs.existsSync(CONFIG_PATH)) {
        write();
    }

    console.log("Loading server config from " + CONFIG_PATH);
    CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH));

    return CONFIG;
};

const write = () => {
    console.log("Writing current config to " + CONFIG_PATH);
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(CONFIG, null, 2));
};

const getRoot = () => CONFIG.root;

const setRoot = (root) => {
    CONFIG.root = root;
    write();
};

module.exports = {
    load,
    write,
    getRoot,
    setRoot,
};
