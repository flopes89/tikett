import fs from "fs-extra";
import path from "path";
import os from "os";
import config from "../server/config";
import uuid from "uuid/v4";

describe("config", () => {
    const root = path.resolve(os.tmpdir(), "tikett-test-config-" + uuid());
    const filesDir = path.resolve(root, "files");
    const configPath = path.resolve(root, ".tikett.json");

    beforeAll(() => {
        fs.ensureDirSync(filesDir);
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
        config.setRoot(filesDir);
        expect(config.getRoot()).toBe(filesDir);
    });
});
