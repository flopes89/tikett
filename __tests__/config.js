import fs from "fs";
import path from "path";
import config from "../server/config";

describe("config", () => {
    const configPath = path.resolve(__dirname, ".tikett.json");
    const root = path.resolve(__dirname, "data");

    beforeAll(() => {
        if (fs.existsSync(configPath)) {
            fs.unlinkSync(configPath);
        }
    });

    afterAll(() => {
        fs.unlinkSync(configPath);
    });

    it("initializes new config", () => {
        expect.assertions(2);

        const load = config.load(configPath);

        expect(fs.existsSync(configPath)).toBeTruthy();
        expect(load).toEqual({
            root: "",
        });
    });

    it("sets a new root folder", () => {
        expect.assertions(2);
        expect(config.getRoot()).toBe("");
        config.setRoot(root);
        expect(config.getRoot()).toBe(root);
    });
});
