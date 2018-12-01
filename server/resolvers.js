const db = require("./db");

const files = () => {
    const files = db.getFiles();

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
