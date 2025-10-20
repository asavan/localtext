import settings from "./settings.js";
import {parseSettings} from "netutils";
import gameMode from "./mode/net.js";

export default function starter(window, document) {
    parseSettings(window.location.search, settings);
    return gameMode(window, document, settings);
}
