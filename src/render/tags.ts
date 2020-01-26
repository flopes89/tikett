import { createLogger } from "./logger";

export type TagGroup = {
    name: string;
    color: string;
    tags: string[];
};

export const UNGROUPED_NAME = "Ungrouped";
export const UNGROUPED_COLOR = "#efefef";

const LOG = createLogger("tags");

// Either fetches an existing group by name or creates it
// if a color is given, this color will overwrite the color of the existing group
export const ensureGroup = async(name: string, color?: string): Promise<TagGroup> => {
    const db = await load();
    const existing = db.tagGroups.find(group => group.name === name);

    if (existing) {
        if (color) {
            LOG.info("Changing color of group [%s] from [%s] -> [%s]", name, existing.color, color);
            existing.color = color;
            await persist();
        }

        return existing;
    }

    const newGroup = {
        name,
        color: color || UNGROUPED_COLOR,
        tags: [],
    };

    LOG.info("Creating new group [%s]", name);
    await addGroup(newGroup);

    return newGroup;
};

export const ensureTag = async(name: string, groupName?: string): Promise<string> => {
    const db = await load();

    for (const group of db.tagGroups) {
        const found = group.tags.find(tag => tag === name);

        if (!found) {
            continue;
        }

        // If the group should be changed, just remove the tag from the group it was found in
        // instead of setting it as a result -> the code after this loop will then
        // re-add it to the new group
        if (groupName && groupName !== group.name) {
            group.tags = group.tags.filter(tag => tag === name);
            LOG.info("Removing tag [%s] from group [%s]", name, groupName);
            break;
        }
        // Otherwise (no new group set, or group is the same, just return the result)
        else {
            return found;
        }
    }

    let group = await ensureGroup(groupName || UNGROUPED_NAME);

    LOG.info("Saving tag [%s] in group [%s]", name, group.name);

    group.tags.push(name);
    await persist();

    return name;
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
