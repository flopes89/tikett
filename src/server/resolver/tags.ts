import { GqlQueryResolvers, GqlMutationResolvers } from "../../generated/graphql";
import { getDb, persist } from "../db";
import { DEFAULT_TAG_COLOR } from "../../shared/interface-types";
import { createLogger } from "../logger";

const LOG = createLogger("tagsResolver");

export const tagGroups: GqlQueryResolvers["tagGroups"] = () => getDb().tagGroups;

export const tags: GqlQueryResolvers["tags"] = () => {
    const groups = getDb().tagGroups;
    return groups.map(group => group.tags).flat();
};

export const createTagGroup: GqlMutationResolvers["createTagGroup"] = async(root, args) => {
    LOG.info("Creating new tag group [%s]", args.name);

    const groups = getDb().tagGroups;
    groups.push({
        name: args.name,
        color: DEFAULT_TAG_COLOR,
        tags: [],
    });
    
    await persist();

    return true;
};

export const removeTagGroup: GqlMutationResolvers["removeTagGroup"] = async(root, args) => {
    LOG.info("Removing tag group [%s]", args.group);

    const groups = getDb().tagGroups;
    getDb().tagGroups = groups.filter(group => group.name !== args.group);
    
    await persist();

    return true;
};

export const moveTag: GqlMutationResolvers["moveTag"] = async(root, args) => {
    LOG.info("Moving tag [%s] to [%s]", args.tag, args.group);

    const groups = getDb().tagGroups;
    
    groups.forEach(group => {
        if (group.tags.includes(args.tag)) {
            group.tags.splice(group.tags.indexOf(args.tag), 1);
        }
    
        if (group.name === args.group) {
            group.tags.push(args.tag);
            group.tags = group.tags.sort();
        }
    });
    
    await persist();

    return true;
};

export const changeColor: GqlMutationResolvers["changeColor"] = async(root, args) => {
    LOG.info("Changing color of [%s] to [%s]", args.group, args.color);

    const groups = getDb().tagGroups;
    
    groups.forEach(group => {
        if (group.name === args.group) {
            group.color = args.color;
        }
    });
    
    await persist();

    return true;
};
