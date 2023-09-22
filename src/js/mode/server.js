"use strict";

import {removeElem, log} from "../helper.js";
import actionsFunc from "../actions_server.js";
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
            const {callback, res, fName, id, data} = queue.dequeue();
            console.log("Progress start", fName, inProgress);
            inProgress = true;
            const validate = await callback(res, id);
            if (validate) {
                // connection.sendAll(data);
            } else {
                console.error("Bad move", data);
            }
            // console.log("Progress stop", fName, inProgress);
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

export default function server(window, document, settings, gameFunction) {
    const clients = {};
    let index = 0;
    clients["server"] = {"index": index};

    return new Promise((resolve, reject) => {

        const myId = makeid(6);
        const connection = connectionFunc(settings, window.location, myId, console);
        const logger = document.getElementsByClassName("log")[0];
        connection.on("error", (e) => {
            log(settings, e, logger);
        });
        connection.on("socket_open", async () => {
            const code = makeQr(window, document, settings);
            connection.on("socket_close", () => {
                removeElem(code);
            });
        });

        const queue = Queue();
        const game = gameFunction(window, document, settings);
        const actions = actionsFunc(game, clients);
        setupProtocol(connection, actions, queue);


        connection.on("disconnect", (id) => {
            const is_disconnected = game.disconnect(id);
            if (is_disconnected) {
                --index;
                delete clients[id];
            }
            console.log(id, index);
        });

        connection.on("open", (id) => {
            console.log("Connected2");
            ++index;
            clients[id] = {"index": index};
        });

        loop(queue, window);

        console.log(connection);
        connection.connect().then(con => {
            console.log("Connected");
            for (const handlerName of game.actionKeys()) {
                game.on(handlerName, (n) => con.sendAll(toObjJson(n, handlerName)));
            }
            game.on("username", (n) => game.setUsername(n));
            game.onConnect();
        }).catch(e => {
            log(settings, e, logger);
            reject(e);
        });

        resolve(game);
    });
}
