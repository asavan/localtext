"use strict"; // jshint ;_;
import enterName from "./names.js";

function stub(message) {
    console.trace("Stub " + message);
}

export default function game(window, document, settings) {

    const players = [];

    const handlers = {
        "message": stub,
        "username": stub
    };

    function on(name, f) {
        handlers[name] = f;
    }

    const join = (ind, name, external_id) => {
        players[ind] = {"name": name, "external_id": external_id};
        return true;
    };

    const disconnect = (external_id) => {
        console.log("disconnect", external_id);
        const old_size = players.length;
        players = players.filter(p => p.external_id != external_id);
        const new_size = players.length;
        return old_size > new_size;
    };

    const onConnect = () => {
        console.log("onConnect", handlers);
        enterName(window, document, settings, handlers);
    };

    const actionKeys = () => Object.keys(handlers);

    const onMessage = () => {}

    return {
        on,
        join,
        onConnect,
        disconnect,
        actionKeys,
        onMessage
    };
}
