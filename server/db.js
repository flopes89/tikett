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

const dump = () => fs.writeFileSync(DBPATH, JSON.stringify(DB));

const reload = () => {
    if (!fs.existsSync(DBPATH)) {
        dump();
    }

    DB = Object.assign({}, DB_DEFAULTS, JSON.parse(fs.readFileSync(DBPATH)));
};

reload();

const getFiles = () => {
    reload();
    return DB.files;
};

const reloadFiles = () => {
    const files = glob.sync(process.env.FILE_ROOT + "/**/*");

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

    dump();
};

const getOrCreateTag = (tag_) => {
    reload();

    let result = _.find(DB.tags, { name: tag_ });

    if (!result) {
        result = {
            name: tag_,
            color: "#ccc",
        };
        DB.tags.push(result);
    }

    dump();

    return result;
};

module.exports = {
    getFiles,
    reloadFiles,
    getOrCreateTag,
};
