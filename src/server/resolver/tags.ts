import { GqlQueryResolvers, GqlMutationResolvers } from "../../generated/graphql";
import { getDb, persist } from "../db";
import { DEFAULT_TAG_COLOR } from "../../shared/interface-types";

export const tagGroups: GqlQueryResolvers["tagGroups"] = () => getDb().tagGroups;

export const tags: GqlQueryResolvers["tags"] = () => {
    const groups = getDb().tagGroups;
    return Array.prototype.concat(groups.map(group => group.tags));
};

export const createTagGroup: GqlMutationResolvers["createTagGroup"] = async(root, args) => {
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
    const groups = getDb().tagGroups;
    getDb().tagGroups = groups.filter(group => group.name !== args.group);
    await persist();
    return true;
};

export const moveTag: GqlMutationResolvers["moveTag"] = async(root, args) => {
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
    const groups = getDb().tagGroups;
    
    groups.forEach(group => {
        if (group.name === args.group) {
            group.color = args.color;
        }
    });
    
    await persist();

    return true;
};
