"use strict"; // jshint ;_;
import enterName from "./names.js";
// import {delay} from "./helper.js";

function stub(message) {
    console.trace("Stub " + message);
}

async function addMessage(document, messageObj, className) {
    const messageList = document.querySelector(".chat-window");
    const mTemplate = document.querySelector("#message-template");
    const mClone = mTemplate.content.cloneNode(true).firstElementChild;
    mClone.classList.add(className);
    mClone.querySelector(".msg").innerText = messageObj.text;
    mClone.querySelector(".username").innerText = messageObj.username;
    mClone.querySelector("minidenticon-svg").setAttribute("username", messageObj.username);
    const date = new Date(messageObj.date);
    mClone.querySelector(".timestamp").innerText = date.toLocaleTimeString();
    messageList.appendChild(mClone);
    // await delay(200);
    messageList.scrollTop = messageList.scrollHeight;
}

export default function game(window, document, settings) {

    const textInput = document.querySelector(".chat-input input");
    textInput.addEventListener("keyup", () => {
        if (textInput.value == "") {
            textInput.classList.remove("good");
        } else {
            textInput.classList.add("good");
        }
    });

    function onWindowResize() {
        const messageList = document.querySelector(".chat-window");
        messageList.scrollTop = messageList.scrollHeight;
    }

    textInput.focus();
    window.onresize = onWindowResize;


    let players = [];
    let username = "";

    const handlers = {
        "message": stub,
        "username": stub
    };

    const setUsername = (name) => {
        username = name;
    };

    // enterName(window, document, settings, game.getHandlers());
    function sendMessage(text) {
        const now = Date.now();
        const messageObj = {
            text: text,
            date: now,
            username: username
        };
        handlers["message"](messageObj);
        addMessage(document, messageObj, "msg-self");
    }

    function onMessage(message) {
        addMessage(document, message, "msg-remote");
        return true;
    }

    const form = document.querySelector(".chat-input");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        textInput.focus({ preventScroll: true });
        if (username === "") {
            enterName(window, document, settings, handlers);
            return;
        }
        if (textInput.value === "") {
            return;
        }
        sendMessage(textInput.value);
        textInput.value = "";
        textInput.classList.remove("good");
    });


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

    return {
        on,
        join,
        onConnect,
        disconnect,
        actionKeys,
        onMessage,
        setUsername
    };
}
