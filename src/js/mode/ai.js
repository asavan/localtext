"use strict";

import rngFunc from "../utils/random.js";

export default function ai(window, document, settings, gameFunction) {
    return new Promise((resolve) => {
        settings.externalId = "client1";
        const game = gameFunction(window, document, settings);

        game.join(0, "server", "server");
        for (let i = 1; i < 4; ++i) {
            const name = "client" + i;
            game.join(i, name, name);
        }

        resolve(game);
    });
}
