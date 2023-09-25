"use strict"; // jshint ;_;
import enterName from "./names.js";

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

function handleResize(window, document) {
    function onWindowResize() {
        const messageList = document.querySelector(".chat-window");
        messageList.scrollTop = messageList.scrollHeight;
        if (window.visualViewport) {
            const newH = Math.floor(window.visualViewport.height) + "px";
            console.log(newH);
            const root = document.documentElement;
            root.style.setProperty("--window-inner-height", newH);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.onresize = onWindowResize;
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", onWindowResize);
    }
}

function setupInput(textInput) {
    const onChange = () => {
        if (textInput.value == "") {
            textInput.classList.remove("good");
        } else {
            textInput.classList.add("good");
        }
    };
    textInput.addEventListener("keyup", onChange);
    textInput.addEventListener("change", onChange);
}

export default function game(window, document, settings) {

    const textInput = document.querySelector(".chat-input input");
    setupInput(textInput);

    let username = "";
    handleResize(window, document);
    console.log(settings.mode);

    const handlers = {
        "message": stub
    };

    const setUsername = (name) => {
        username = name;
        textInput.focus();
    };

    enterName(window, document, setUsername);

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
            enterName(window, document, setUsername);
            return;
        }
        if (textInput.value === "") {
            return;
        }
        sendMessage(textInput.value);
        textInput.value = "";
        // textInput.classList.remove("good");
    });

    function on(name, f) {
        handlers[name] = f;
    }

    const onConnect = () => {
    };

    const actionKeys = () => Object.keys(handlers);

    return {
        on,
        onConnect,
        actionKeys,
        onMessage
    };
}
