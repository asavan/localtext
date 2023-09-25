"use strict";

import {removeElem, log, error} from "../helper.js";
import actionsFunc from "../actions.js";
import qrRender from "../lib/qrcode.js";
import Queue from "../utils/queue.js";
import connectionFunc from "../connection/socket.js";
import rngFunc from "../utils/random.js";

function toObjJson(v, method) {
    const value = {
        "method": method
    };
    value[method] = v;
    return JSON.stringify(value);
}

function makeid(length) {
    return rngFunc.makeId(length, Math.random);
}

function makeQr(window, document, settings) {
    const staticHost = settings.sh || window.location.href;
    const url = new URL(staticHost);
    console.log("enemy url", url.toString());
    return qrRender(url.toString(), document.querySelector(".qrcode"));
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
    connection.on("recv", (data, id) => {
        const obj = JSON.parse(data);
        console.log(data, obj);
        const res = obj[obj.method];
        const callback = actions[obj.method];
        if (typeof callback === "function") {
            console.log("recv2");
            queue.enqueue({callback, res, fName: obj.method, id, data});
        } else {
            console.log("recv3", actions, actions[data.method], data.method, typeof callback);
        }
    });
}

//function setupMedia() {
//    if (navigator.mediaDevices) {
//        return navigator.mediaDevices.getUserMedia({
//            audio: true,
//            video: true
//        });
//    } else {
//        console.log("No mediaDevices");
//    }
//}

export default function gameMode(window, document, settings, gameFunction) {

    return new Promise((resolve, reject) => {

        const myId = makeid(6);
        const logger = settings.logger ? document.querySelector(settings.logger) : null;
        const networkLoggerFunc = () => {
            const logInner = (data) => {
                if (!settings.networkDebug || !logger) {
                    return;
                }
                return log(data, logger);
            };
            const errorInner = (data) => {
                if (!logger) {
                    return;
                }
                return error(data, logger);
            };
            return {
                log: logInner,
                error: errorInner
            };
        };
        const networkLogger = networkLoggerFunc();
        const connection = connectionFunc(settings, window.location, myId, networkLogger);
        connection.on("error", (e) => {
            networkLogger.error(e, logger);
        });
        connection.on("socket_open", async () => {
            const code = makeQr(window, document, settings);
            connection.on("socket_close", () => {
                removeElem(code);
            });
        });

        const queue = Queue();
        const game = gameFunction(window, document, settings);
        const actions = actionsFunc(game);
        setupProtocol(connection, actions, queue);

        loop(queue, window);

        connection.connect().then(con => {
            for (const handlerName of game.actionKeys()) {
                game.on(handlerName, (n) => con.sendAll(toObjJson(n, handlerName)));
            }
            game.onConnect();
        }).catch(e => {
            networkLogger.error(e, logger);
            reject(e);
        });

        resolve(game);
    });
}
