"use strict";

import rngFunc from "../utils/random.js";

export default function ai(window, document, settings, gameFunction) {
    return new Promise((resolve) => {
        settings.externalId = "client1";
        settings.seed = rngFunc.makeId(6, Math.random);
        settings.clickAll = true;
        const game = gameFunction(window, document, settings);

        game.on("move", (move) => console.log(move));
        game.on("draw", () => {});
        game.on("shuffle", () => {});
        game.on("discard", () => {});
        game.on("changeCurrent", () => {});
        game.on("clearPlayer", () => {});
        game.join(0, "server", "server");
        for (let i = 1; i < 4; ++i) {
            const name = "client" + i;
            game.join(i, name, name);
        }
        game.afterAllJoined();

        game.on("gameover", () => {
            const btnAdd = document.querySelector(".butInstall");
            btnAdd.classList.remove("hidden2");
        });

        resolve(game);
    });
}
