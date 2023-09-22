"use strict";

import settings from "./settings.js";
import gameFunction from "./game.js";
import {parseSettings} from "./helper.js";

export default async function starter(window, document) {
    parseSettings(window, document, settings);
    const mode = await import("./mode/server.js");
    mode.default(window, document, settings, gameFunction);
}
