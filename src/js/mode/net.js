"use strict";

import { getWebSocketUrl, getMyId } from "../connection/common.js";
import actionsFunc from "../actions.js";
import PromiseQueue from "../utils/async-queue.js";
import connectionFunc from "../connection/socket.js";
import loggerFunc from "../utils/logger.js";
import { makeQr, removeElem } from "../utils/qr_helper.js";
import gameFunction from "../game.js";
import networkMapper from "../connection/network_mapper.js";
import glueObj from "../connection/glue.js";
import handlersFunc from "../utils/handlers.js";


function glueNetToActions(connection, actions, queue) {
    const mapperActions = glueObj.simpleMapper(actions);
    const networkHandler = handlersFunc(mapperActions.actionKeys(), queue);
    const glued = glueObj.glueSimple(networkHandler, mapperActions);
    connection.registerHandler(networkHandler);
    return glued;
}

export default async function gameMode(window, document, settings) {
    const myId = getMyId(window, settings, Math.random);
    const loggerEl = settings.logger ? document.querySelector(settings.logger) : null;
    const networkLogger = loggerFunc(5, loggerEl, settings);
    const logger = loggerFunc(6, null, settings);
    const socketUrl = getWebSocketUrl(settings, window.location);
    if (!socketUrl) {
        networkLogger.error("Can't determine ws address", socketUrl);
        return;
    }

    const connection = connectionFunc(myId, networkLogger, false);

    const queue = PromiseQueue(logger);
    const game = gameFunction(window, document, settings);
    const actions = actionsFunc(game);
    glueNetToActions(connection, actions, queue);

    await connection.connect(socketUrl);
    const code = makeQr(window, document, settings);
    connection.on("socket_close", () => {
        removeElem(code);
    });
    const nMapper = networkMapper.networkMapperServer({connection});
    glueObj.glueSimple(game, nMapper);
    game.onConnect();
}
