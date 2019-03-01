const path = require("path");
const fs = require("fs");
const db = require("./db");
const _ = require("lodash");
const config = require("./config");
const driveLetters = require("windows-drive-letters");

const LOG = require("./logger")("resolver");

const getConfig = () => ({
    root: config.getRoot(),
});

const changeRoot = (args) => {
    const folder = path.resolve(args.folder);

    if (!fs.existsSync(folder)) {
        throw "Folder does not exist";
    }

    if (!fs.statSync(folder).isDirectory) {
        throw "Must be a folder!";
    }

    fs.accessSync(folder, fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK);

    config.setRoot(folder);
    db.init(folder);
    reload();

    return true;
};

const files = ({ current, showDescendants, filters }) => {
    // Deep copy the files array to make sure changing
    // the tags on a file isn't persisted to the database
    const files = _.map(db.getFiles(), _.clone);
    current = current.substring(1, current.length);

    const currentFolder = path.resolve(db.getRoot(), current);

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

        let matchesFilter = false;
        filters.forEach((filter) => matchesFilter |= file.tags.indexOf(filter) !== -1);

        // Files only have the tag names (string) attached, but for the
        // resolver the color is also needed, so the tags must be converted to objects
        // to get the color attached to them
        const tagObjects = [];

        file.tags.forEach((tag) => {
            const color = db.getColorOfTag(tag);
            const tagName = db.getOrCreateTag(tag);

            tagObjects.push({
                name: tagName,
                color,
            });
        });

        file.tags = tagObjects;

        if (matchesFilter || !file.isFile || filters.length === 0) {
            enhancedFiles.push(file);
        }
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
    if (!args.name) {
        return false;
    }

    db.createTagGroup(args.name);
    return true;
};

const removeTagGroup = (args) => {
    if (!args.group || args.group === "Ungrouped") {
        return false;
    }

    db.removeTagGroup(args.group);
    return true;
};

const createTag = (args) => {
    if (!args.name) {
        return false;
    }

    db.getOrCreateTag(args.name);
    return true;
};

const addTag = (args) => {
    if (!args.name) {
        return false;
    }

    db.addTagToFile(args.path, args.name);
    return true;
};

const removeTag = (args) => {
    db.removeTagFromFile(args.path, args.name);
    return true;
};

const moveTag = (args) => {
    db.moveTag(args.tag, args.group);
    return true;
};

const changeColor = (args) => {
    db.changeColor(args.group, args.color);
    return true;
};

const tags = () => {
    let tags = [];

    db.getTagGroups().forEach((group) => {
        tags = tags.concat(group.tags);
    });

    return tags;
};

const isDir = (source) => {
    try {
        const isDir = fs.statSync(source).isDirectory();
        fs.readdirSync(source);
        return isDir;
    } catch (err) {
        return false;
    }
};

const folders = (args) => {
    let current = args.current;

    if (!current) {
        current = config.getRoot();
    }

    let dirs = [];

    if (current === "/" && process.platform === "win32") {
        driveLetters.usedLettersSync().forEach((letter) => {
            try {
                fs.readdirSync(letter + ":");

                dirs.push({
                    name: letter + ":",
                    path: letter + ":" + path.sep
                });
            } catch (e) {
                // Ignore and don't provide the letter as an option for selection
                LOG.info(`Skipping drive ${letter} because it's unreadable`);
            }
        });
    } else {
        current = path.resolve(current);
        dirs = fs.readdirSync(current)
            .map((name) => ({
                name,
                path: path.join(current, name)
            }))
            .filter(({ path }) => isDir(path));

        // Add a "back to root" option for windows to get back to the drive selection
        if (/^[a-z]:\\$/i.test(current) && process.platform === "win32") {
            dirs.unshift({
                name: "Select different drive",
                path: "/",
            });
        } else {
            dirs.unshift({
                name: "..",
                path: path.resolve(current, "..")
            });
        }
    }

    return dirs;
};

module.exports = {
    config: getConfig,
    changeRoot,
    files,
    tagGroups,
    reload,
    createTagGroup,
    removeTagGroup,
    createTag,
    addTag,
    removeTag,
    moveTag,
    changeColor,
    tags,
    folders,
};
