const path = require("path");
const db = require("./db");
const _ = require("lodash");

const files = ({ current, showAllChildren }) => {
    // Deep copy the files array to make sure changing
    // the tags on a file isn't persisted to the database
    const files = _.map(db.getFiles(), _.clone);

    const currentFolder = path.resolve(process.env.FILE_ROOT, current);

    // The file objects returned from graphql should contain the full tag
    // objects instead of just the names (that are saved in the DB)
    // To do this, each file is enanced before it's returned
    let enhancedFiles = [];

    files.forEach((file_) => {
        const filePath = path.relative(currentFolder, file_.path);

        // Ignore the current folder
        if (!filePath) {
            return;
        }

        if (showAllChildren) {
            // When all ancestors should be shown, there is no use in
            // showing the folders themselves as well
            if (!file_.isFile) {
                return;
            }

            const dirname = path.dirname(filePath);

            // Ignore files that are not actually children of this folder
            if (dirname === "..") {
                return;
            }

            // Files should however show which folder they are in
            file_.name = dirname + path.sep + file_.name;
        } else if (filePath.indexOf(path.sep) !== -1) {
            // Ignore any files that in subfolder of the current path
            return;
        }

        if (file_.tags) {
            const tagObjects = [];
            file_.tags.forEach((tag_) => tagObjects.push(db.getOrCreateTag(tag_)));
            file_.tags = tagObjects;
        }

        enhancedFiles.push(file_);
    });

    enhancedFiles.unshift({
        name: "..",
        tags: [],
        isFile: false,
        path: path.resolve(currentFolder, ".."),
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
