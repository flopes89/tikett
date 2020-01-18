import { combineReducers } from "redux";
import fileBrowser from "./fileBrowser";
import global from "./global";

export default combineReducers({
    global,
    fileBrowser,
});
