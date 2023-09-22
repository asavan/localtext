"use strict";

function init(game) {
    return {
        "move": (data) => {
            return game.onMessage(data);
        }
    };
}

export default init;
