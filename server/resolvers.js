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

    files.forEach((file) => {
        const filePath = path.relative(currentFolder, file.path);

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
            if (!file.isFile) {
                return;
            }

            // Files should however show which folder they are in
            file.name = path.dirname(filePath) + path.sep + file.name;
        } else if (filePath.indexOf(path.sep) !== -1) {
            // Ignore files and folders in ancestors that are not actually children of this folder
            return;
        }

        if (file.tags) {
            const tagObjects = [];
            file.tags.forEach((tag) => tagObjects.push(db.getOrCreateTag(tag)));
            file.tags = tagObjects;
        }

        enhancedFiles.push(file);
    });

    enhancedFiles.unshift({
        name: "..",
        tags: [],
        isFile: false,
        path: path.resolve(currentFolder, ".."),
    });

    return enhancedFiles;
};

const reload = () => {
    db.reloadFiles();
    return true;
};

const tagGroups = () => db.getTagGroups();

const createTagGroup = (args) => {
    if (args.name && args.name !== "") {
        db.createTagGroup(args.name);
    }

    return tagGroups();
};

const removeTagGroup = (args) => {
    if (args.group && args.group !== "") {
        db.removeTagGroup(args.group);
    }

    return tagGroups();
};

const createTag = (args) => {
    if (args.name) {
        db.getOrCreateTag(args.name);
    }

    return tagGroups();
};

const addTag = (args) => {
    if (!args.name) {
        return false;
    }

    db.addTagToFile(args.path, args.name);

    return true;
};

module.exports = {
    files,
    tagGroups,
    reload,
    createTagGroup,
    removeTagGroup,
    createTag,
    addTag,
};
