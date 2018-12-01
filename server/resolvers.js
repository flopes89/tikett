const db = require("./db");
const _ = require("lodash");

const files = () => {
    // Deep copy the files array to make sure changing
    // the tags on a file isn't persisted to the database
    const files = _.map(db.getFiles(), _.clone);

    files.forEach((file_) => {
        if (file_.tags) {
            const tagObjects = [];
            file_.tags.forEach((tag_) => tagObjects.push(db.getOrCreateTag(tag_)));
            file_.tags = tagObjects;
        }
    });

    return files;
};

const reload = () => {
    db.reloadFiles();
    return files();
};

module.exports = {
    files,
    reload,
};
