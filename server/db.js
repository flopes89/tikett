const path = require("path");
const fs = require("fs");
const glob = require("glob");
const _ = require("lodash");

let DBPATH = "";

const DB_DEFAULTS = {
    files: [],
    tagGroups: [{
        name: "Ungrouped",
        color: "#333",
        tags: [],
    }],
};

let DB = _.cloneDeep(DB_DEFAULTS);

const init = (path) => {
    DBPATH = path.resolve(path, "tikettdb.json");
    reload();
};

const getRoot = () => {
    if (!DBPATH) {
        console.error("No DB initialized!");
        return "";
    }

    return path.dirname(DBPATH);
};

const reload = () => {
    if (!DBPATH) {
        console.error("No DB initialized!");
        return;
    }

    if (!fs.existsSync(DBPATH)) {
        dump();
    }

    console.log("Reloading database from file");
    DB = JSON.parse(fs.readFileSync(DBPATH));
};

const dump = () => {
    if (!DBPATH) {
        console.error("No DB initialized!");
        return;
    }

    console.log("Dumping current database contents");
    fs.writeFileSync(DBPATH, JSON.stringify(DB, null, 2));
};

const getFiles = () => DB.files;

const reloadFiles = () => {
    const root = getRoot();
    if (!root) {
        console.error("No root folder set!");
        return;
    }

    const files = glob.sync(root + "/**/*", {
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
        if (result) {
            return;
        }

        let found = _.find(group.tags, { name: tag });
        if (found) {
            result = found;
        }
    });

    if (!result) {
        console.log("Creating new tag [" + tag + "]");
        let ungrouped = _.find(DB.tagGroups, { name: "Ungrouped" });

        if (!ungrouped) {
            ungrouped = createTagGroup("Ungrouped");
        }

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
    if (_.find(DB.tagGroups, { name })) {
        return;
    }

    const newGroup = {
        name,
        color: "#ccc",
        tags: [],
    };

    DB.tagGroups.push(newGroup);

    return newGroup;
};

const getTags = () => DB.tags;

const removeTagGroup = (name) => {
    _.remove(DB.tagGroups, { name });
};

const getFile = (path) => _.find(DB.files, { path });

const addTagToFile = (filePath, tagName) => {
    const file = getFile(filePath);
    const newTag = getOrCreateTag(tagName);
    file.tags.push(newTag.name);
    updateFilePath(file);
};

const removeTagFromFile = (filePath, tagName) => {
    const file = getFile(filePath);
    _.remove(file.tags, (tag) => tag === tagName);
    updateFilePath(file);
};

const updateFilePath = (file) => {
    const ext = path.extname(file.path);
    const basename = path.basename(file.path, ext);
    const name = basename.replace(/\[[^\]]*\]/, "");

    let tags = file.tags.join(" ");
    if (tags && tags !== "") {
        tags = "[" + tags + "]";
    }

    const newPath = path.resolve(path.dirname(file.path), name + tags + ext);

    fs.renameSync(file.path, newPath);
    file.path = newPath;
}

module.exports = {
    init,
    getRoot,
    dump,
    reload,
    getFiles,
    getTagGroups,
    createTagGroup,
    getTags,
    reloadFiles,
    getOrCreateTag,
    removeTagGroup,
    getFile,
    addTagToFile,
    removeTagFromFile,
};
