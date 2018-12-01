const path = require("path");
const fs = require("fs");
const glob = require("glob");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(path.resolve(process.env.FILE_ROOT, "otfs-db.json"));
const db = lowdb(adapter);

db.defaults({
    files: [],
    tagGroups: [],
    tags: [],
}).write();

const getFiles = () => db.get("files").value();

const reloadFiles = () => {
    const files = glob.sync(process.env.FILE_ROOT + "/**/*");

    db.unset("files").write();
    db.set("files", []).write();
    const dbFiles = db.get("files");

    files.forEach((file_) => {
        const basename = path.basename(file_);
        const name = basename.replace(/\[[^\]]*\]/, "");
        const tags = /\[([^\]]*)\]/.exec(basename);

        dbFiles.push({
            name: name,
            tags: tags ? tags[1].split(" ") : [],
            path: path.resolve(file_),
            isFile: fs.statSync(file_).isFile(),
        }).write();
    });

    return true;
};

const getOrCreateTag = (tag_) => {
    const tags = db.get("tags");
    let result = tags.find({ name: tag_ }).value();

    if (!result) {
        result = {
            name: tag_,
            color: "#ccc",
        };
        tags.push(result).write();
    }

    return result;
};

module.exports = {
    getFiles,
    reloadFiles,
    getOrCreateTag,
};
