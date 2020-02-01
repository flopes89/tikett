import { TagGroup } from "./state/tags";
import { getColorOfTag } from "./util";

it("finds color of tag", () => {
    const groups: TagGroup[] = [{
        name: "group1",
        color: "#fff",
        tags: ["tag1", "tag2", "tag3"],
    },{
        name: "group2",
        color: "#333",
        tags: ["tag4", "tag5"],
    }];

    expect.assertions(3);

    expect(getColorOfTag(groups, "tag1")).toEqual("#fff");
    expect(getColorOfTag(groups, "tag4")).toEqual("#333");
    expect(getColorOfTag(groups, "tag6")).toEqual("");
});
