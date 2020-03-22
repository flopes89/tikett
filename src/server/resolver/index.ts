import { addTags, removeTag, files, folders, renameFile, removeFile } from "./files";
import { config, changeRoot } from "./config";
import { tagGroups, tags, changeColor, createTagGroup, moveTag, removeTagGroup, renameTagGroup } from "./tags";

export const resolvers = {
    Query: {
        config,
        files,
        folders,
        tags,
        tagGroups,
    },
    Mutation: {
        addTags,
        renameFile,
        removeFile,
        removeTag,
        changeRoot,
        createTagGroup,
        removeTagGroup,
        moveTag,
        changeColor,
        renameTagGroup,
    }
};
