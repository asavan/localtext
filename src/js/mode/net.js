"use strict";

import actionsFunc from "../actions.js";
import Queue from "../utils/queue.js";
import connectionFunc from "../connection/socket.js";
import rngFunc from "../utils/random.js";
import loggerFunc from "../utils/logger.js";
import { makeQr, removeElem } from "../utils/qr_helper.js";
import gameFunction from "../game.js";

function toObjJson(v, method) {
    const value = {
        "method": method
    };
    value[method] = v;
    return value;
}

function makeid(length) {
    return rngFunc.makeId(length, Math.random);
}

function loop(queue, window) {
    let inProgress = false;

    async function step() {
        if (!queue.isEmpty() && !inProgress) {
            const {callback, res, id} = queue.dequeue();
            inProgress = true;
            await callback(res, id);
            inProgress = false;
        }
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

function setupProtocol(connection, actions, queue) {
    connection.on("recv", (obj, id) => {
        const res = obj[obj.method];
        const callback = actions[obj.method];
        if (typeof callback === "function") {
            queue.enqueue({callback, res, fName: obj.method, id});
        }
    });
}

export default function gameMode(window, document, settings) {

    return new Promise((resolve, reject) => {

        const myId = makeid(6);
        const loggerEl = settings.logger ? document.querySelector(settings.logger) : null;
        const networkLogger = loggerFunc(5, loggerEl, settings);
        const connection = connectionFunc(settings, window.location, myId, networkLogger);
        connection.on("error", (e) => {
            networkLogger.error(e);
            reject(e);
        });

        const queue = Queue();
        const game = gameFunction(window, document, settings);
        const actions = actionsFunc(game);
        setupProtocol(connection, actions, queue);

        loop(queue, window);

        connection.connect().then(con => {
            const code = makeQr(window, document, settings);
            connection.on("socket_close", () => {
                removeElem(code);
            });
            for (const handlerName of game.actionKeys()) {
                game.on(handlerName, (n) => con.sendAll(toObjJson(n, handlerName)));
            }
            game.onConnect();
        }).catch(e => {
            networkLogger.error(e);
            reject(e);
        });

        resolve(game);
    });
}
