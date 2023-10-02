"use strict";

import settings from "./settings.js";
import gameFunction from "./game.js";
import {parseSettings} from "./helper.js";
import gameMode from "./mode/net.js";

export default function starter(window, document) {
    parseSettings(window, document, settings);
    return gameMode(window, document, settings, gameFunction);
}
