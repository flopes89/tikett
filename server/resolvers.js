const path = require("path");
const db = require("./db");
const _ = require("lodash");

const files = ({ current, showDescendants }) => {
    // Deep copy the files array to make sure changing
    // the tags on a file isn't persisted to the database
    const files = _.map(db.getFiles(), _.clone);
    current = current.substring(1, current.length);

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

        if (filePath.indexOf("..") !== -1) {
            return;
        }

        if (showDescendants) {
            // When all descendants should be shown, there is no use in
            // showing the folders themselves as well
            if (!file_.isFile) {
                return;
            }

            // Files should however show which folder they are in
            file_.name = path.dirname(filePath) + path.sep + file_.name;
        } else if (filePath.indexOf(path.sep) !== -1) {
            // Ignore files and folders in ancestors that are not actually children of this folder
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

const tagGroups = () => db.getTagGroups();

const createTagGroup = (args_) => {
    db.createTagGroup(args_.name);
    return tagGroups();
};

module.exports = {
    files,
    tagGroups,
    reload,
    createTagGroup,
};
