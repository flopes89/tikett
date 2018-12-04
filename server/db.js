const path = require("path");
const fs = require("fs");
const glob = require("glob");
const _ = require("lodash");

const DBPATH = path.resolve(process.env.FILE_ROOT, "tikettdb.json");

const DB_DEFAULTS = {
    files: [],
    tagGroups: [{
        name: "Ungrouped",
        color: "#333",
        tags: [],
    }],
};

let DB = _.cloneDeep(DB_DEFAULTS);

const dump = () => {
    console.log("Dumping current database contents");
    fs.writeFileSync(DBPATH, JSON.stringify(DB, null, 2));

};

const reload = () => {
    if (!fs.existsSync(DBPATH)) {
        dump();
    }

    console.log("Reloading databse from file");
    DB = JSON.parse(fs.readFileSync(DBPATH));
};

reload();

const getFiles = () => DB.files;

const reloadFiles = () => {
    const files = glob.sync(process.env.FILE_ROOT + "/**/*", {
        ignore: "**/tikettdb.json",
    });

    DB.files = [];

    files.forEach((file) => {
        console.log("Reading file [" + file + "]");

        const basename = path.basename(file);
        const name = basename.replace(/\[[^\]]*\]/, "");
        let tags = /\[([^\]]*)\]/.exec(basename);
        tags = tags ? tags[1].split(" ") : [];

        DB.files.push({
            name,
            tags,
            path: path.resolve(file),
            isFile: fs.statSync(file).isFile(),
        });

        if (tags) {
            tags.forEach((tag) => getOrCreateTag(tag));
        }
    });
};

const getOrCreateTag = (tag) => {
    let result = null;

    DB.tagGroups.forEach((group) => {
        if (result) return;

        let found = _.find(group.tags, { name: tag });
        if (found) {
            result = found;
        }
    });

    if (!result) {
        console.log("Creating new tag [" + tag + "]");
        const ungrouped = _.find(DB.tagGroups, { name: "Ungrouped" });
        result = {
            name: tag,
            color: "#ccc",
        };
        ungrouped.tags.push(result);
    }

    return result;
};

const getTagGroups = () => DB.tagGroups;

const createTagGroup = (name) => {
    DB.tagGroups.push({
        name,
        color: "#ccc",
        tags: [],
    });
};

const getTags = () => DB.tags;

module.exports = {
    dump,
    reload,
    getFiles,
    getTagGroups,
    createTagGroup,
    getTags,
    reloadFiles,
    getOrCreateTag,
};
