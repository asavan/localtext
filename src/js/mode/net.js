"use strict";

import actionsFunc from "../actions.js";
import gameFunction from "../game.js";
import networkAdapter from "../connection/network_adapter.js";
import glueObj from "../connection/glue.js";

import {
    createSignalingChannel, broadcastConnectionFunc,
    loggerFunc, PromiseQueue, netObj, makeQrStr, removeElem
} from "netutils";

function makeQr(window, document, settings, serverId) {
    const staticHost = netObj.getHostUrl(settings, window.location);
    const url = new URL(staticHost);
    if (serverId) {
        url.searchParams.set("serverId", serverId);
    }
    console.log("enemy url", url.toString());
    const image = {
        source: "./images/envelope.svg",
        width: "20%",
        height: "10%",
        x: "center",
        y: "center",
    };
    return makeQrStr(url.toString(), window, document, settings, image);
}

export default async function gameMode(window, document, settings) {
    const myId = netObj.getMyId(window, settings, Math.random);
    const networkLogger = loggerFunc(document, settings, 2);
    const logger = loggerFunc(document, settings, 3);
    const serverId = settings.serverId || myId;
    const gameChannel = await createSignalingChannel(myId, serverId, window.location, settings, networkLogger);
    const connection = broadcastConnectionFunc(myId, networkLogger, gameChannel);
    const queue = PromiseQueue(logger);
    const nAdapter = networkAdapter(connection, queue, myId, myId, networkLogger);
    const game = gameFunction(window, document, settings);
    const gAdapter = glueObj.wrapAdapter(game, actionsFunc);

    await connection.connect();

    const code = makeQr(window, document, settings, serverId);
    gameChannel.on("close", () => {
        removeElem(code);
    });
    gAdapter.connectAdapter(nAdapter);
    game.onConnect();
}
