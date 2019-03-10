import { combineReducers } from "redux";
import files from "./files";
import fileBrowser from "./fileBrowser";
import tagGroups from "./tagGroups";
import config from "./config";
import global from "./global";

export default combineReducers({
    global,
    config,
    fileBrowser,
    tagGroups,
    files,
});
