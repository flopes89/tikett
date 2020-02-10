import { files, folders } from "./files";
import { config, changeRoot } from "./config";
import { tagGroups, tags, changeColor, createTagGroup, moveTag, removeTagGroup } from "./tags";

export const resolvers = {
    config,
    files,
    folders,
    tags,
    tagGroups,
    changeRoot,
    createTagGroup,
    removeTagGroup,
    moveTag,
    changeColor,
};
