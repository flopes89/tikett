const path = require("path");
const fs = require("fs");
const glob = require("glob");
const _ = require("lodash");

const DBPATH = path.resolve(process.env.FILE_ROOT, "tagsterdb.json");

const DB_DEFAULTS = {
    files: [],
    tagGroups: [],
    tags: [],
};

let DB = Object.assign({}, DB_DEFAULTS);

const dump = () => {
    console.log("Dumping current database contents");
    fs.writeFileSync(DBPATH, JSON.stringify(DB, null, 2));
};

const reload = () => {
    if (!fs.existsSync(DBPATH)) {
        dump();
    }

    console.log("Reloading databse from file");
    DB = Object.assign({}, DB_DEFAULTS, JSON.parse(fs.readFileSync(DBPATH)));
};

reload();

const getFiles = () => DB.files;

const reloadFiles = () => {
    const files = glob.sync(process.env.FILE_ROOT + "/**/*", {
        ignore: "**/tagsterdb.json",
    });

    DB.files = [];

    files.forEach((file_) => {
        const basename = path.basename(file_);
        const name = basename.replace(/\[[^\]]*\]/, "");
        const tags = /\[([^\]]*)\]/.exec(basename);

        DB.files.push({
            name: name,
            tags: tags ? tags[1].split(" ") : [],
            path: path.resolve(file_),
            isFile: fs.statSync(file_).isFile(),
        });
    });
};

const getOrCreateTag = (tag_) => {
    let result = _.find(DB.tags, { name: tag_ });

    if (!result) {
        console.log("Creating new tag [" + tag_ + "]");
        result = {
            name: tag_,
            color: "#ccc",
        };
        DB.tags.push(result);
    }

    return result;
};

module.exports = {
    dump,
    reload,
    getFiles,
    reloadFiles,
    getOrCreateTag,
};
