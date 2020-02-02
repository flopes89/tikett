
export const DEFAULT_TAG_COLOR = "#efefef";

export type TagGroup = {
    name: string;
    tags: Tag[];
};

export type Tag = {
    name: string;
    color: string;
};
