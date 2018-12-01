const path = require("path");
const db = require("./db");
const _ = require("lodash");

const files = ({ sort, current, showAllChildren }) => {
    // Deep copy the files array to make sure changing
    // the tags on a file isn't persisted to the database
    const files = _.map(db.getFiles(), _.clone);

    const currentFolder = path.resolve(process.env.FILE_ROOT, current);

    // The file objects returned from graphql should contain the full tag
    // objects instead of just the names (that are saved in the DB)
    // To do this, each file is enanced before it's returned
    let enhancedFiles = [];

    files.forEach((file_) => {
        // Ignore any files that in subfolder of the current path
        const filePath = path.relative(currentFolder, file_.path);
        if (!showAllChildren && filePath.indexOf(path.sep) !== -1) {
            return null;
        }

        if (file_.tags) {
            const tagObjects = [];
            file_.tags.forEach((tag_) => tagObjects.push(db.getOrCreateTag(tag_)));
            file_.tags = tagObjects;
            enhancedFiles.push(file_);
        }
    });

    return enhancedFiles;
};

const reload = (args_) => {
    db.reloadFiles();
    return files(args_);
};

module.exports = {
    files,
    reload,
};
