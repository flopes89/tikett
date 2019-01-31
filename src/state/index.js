import { combineReducers } from "redux";
import files from "./files";
import fileBrowser from "./fileBrowser";
import tagGroups from "./tagGroups";
import config from "./config";

export default combineReducers({
    config,
    fileBrowser,
    tagGroups,
    files,
});
