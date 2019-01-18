const path = require("path");
const os = require("os");
const fs = require("fs");
const _ = require("lodash");

const LOG = require("./logger")("config");

const CONFIG_PATH = path.resolve(os.homedir(), ".tikett.json");

const CONFIG_DEFAULTS = {
    root: ""
};

let CONFIG = _.cloneDeep(CONFIG_DEFAULTS);

const load = () => {
    if (!fs.existsSync(CONFIG_PATH)) {
        write();
    }

    LOG.info("Loading server config from [" + CONFIG_PATH + "]");
    CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH));

    return CONFIG;
};

const write = () => {
    LOG.info("Writing current config to [" + CONFIG_PATH + "]");
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(CONFIG, null, 2));
};

const getRoot = () => CONFIG.root;

const setRoot = (root) => {
    CONFIG.root = root;
    LOG.info("New root: [" + CONFIG.root + "]");
    write();
};

module.exports = {
    load,
    write,
    getRoot,
    setRoot,
};
