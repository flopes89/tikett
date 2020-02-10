import { GqlQueryResolvers, GqlMutationResolvers } from "../../generated/graphql";
import { getDb, getDbPath } from "../db";

export const config: GqlQueryResolvers["config"] = () => {
    return {
        root: getDb().root,
        dbPath: getDbPath(),
    };
};

export const changeRoot: GqlMutationResolvers["changeRoot"] = async(root, args) => {
    getDb().root = args.folder;
    return true;
};
