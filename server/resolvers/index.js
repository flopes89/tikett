const db = require("../db");

module.exports = {
    files: () => {
        const files = db.getFiles();

        files.forEach((file_) => {
            if (file_.tags) {
                const tagObjects = [];
                file_.tags.forEach((tag_) => tagObjects.push(db.getOrCreateTag(tag_)));
                file_.tags = tagObjects;
            }
        });

        return files;
    },

    reload: () => db.reloadFiles(),
};
