import { load, write } from "./db";
import { createLogger } from "./logger";

export type TagGroup = {
    name: string;
    color: string;
    tags: string[];
};

const UNGROUPED_NAME = "Ungrouped";
const UNGROUPED_COLOR = "#efefef";

const LOG = createLogger("tags");

export const createTagGroup = async(name: string): Promise<TagGroup> => {
    const db = await load();
    const existing = db.tagGroups.find(group => group.name === name);

    if (existing) {
        return existing;
    }

    const newGroup = {
        name,
        color: UNGROUPED_COLOR,
        tags: [],
    };

    LOG.silly("Creating new tagGroup %s", name);
    db.tagGroups.push(newGroup);
    await write();

    return newGroup;
};

export const getOrCreateTag = async(name: string): Promise<string> => {
    let result = null;
    const db = await load();

    db.tagGroups.forEach((group) => {
        const found = group.tags.find(tag => tag === name);
        if (found) {
            result = found;
            return;
        }
    });

    if (!result) {
        LOG.info("Creating new tag %s", name);
        let ungrouped = db.tagGroups.find(group => group.name === UNGROUPED_NAME);

        if (!ungrouped) {
            ungrouped = await createTagGroup(UNGROUPED_NAME);
        }

        result = name;

        ungrouped.tags.push(result);
        await write();
    }

    return result;
};

export const getColorOfTag = async(name: string): Promise<string> => {
    let result = null;
    const db = await load();

    db.tagGroups.forEach((group) => {
        if (group.tags.find(tag => tag === name)) {
            result = group.color;
            return;
        }
    });

    if (!result) {
        result = UNGROUPED_COLOR;
    }

    return result;
};
