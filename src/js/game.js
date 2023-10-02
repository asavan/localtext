"use strict"; // jshint ;_;
import enterName from "./names.js";

function stub(message) {
    console.trace("Stub " + message);
}

function addMessage(document, messageObj, className) {
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
    messageList.scrollTop = messageList.scrollHeight;
}

function handleResize(window, document, callback) {
    function onWindowResize() {
        const messageList = document.querySelector(".chat-window");
        messageList.scrollTop = messageList.scrollHeight;
        if (window.visualViewport) {
            const newH = Math.floor(window.visualViewport.height) + "px";
            const root = document.documentElement;
            root.style.setProperty("--window-inner-height", newH);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (typeof callback === "function") {
            callback();
        }
    }
    window.onresize = onWindowResize;
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", onWindowResize);
    }
}

function setupInput(textInput, callback) {
    const onChange = () => {
        if (textInput.value == "") {
            textInput.classList.remove("good");
        } else {
            textInput.classList.add("good");
        }
        if (typeof callback === "function") {
            callback();
        }
    };
    textInput.addEventListener("keyup", onChange);
    textInput.addEventListener("change", onChange);
}

function vibrateIfNeeded(inactivePeriod, lastInteractTime) {
    if (inactivePeriod && window.navigator.vibrate) {
        const now = Date.now();
        if ((now - lastInteractTime) > inactivePeriod * 1000) {
            window.navigator.vibrate([200]);
        }
    }
}

export default function game(window, document, settings) {

    const form = document.querySelector(".chat-input");
    const textInput = document.querySelector(".chat-input input");
    let lastInteractTime = Date.now();
    let username = "";
    let connected = false;


    function updateLastInteract() {
        lastInteractTime = Date.now();
    }
    setupInput(textInput, updateLastInteract);
    handleResize(window, document, updateLastInteract);
    console.log(settings.mode);

    const handlers = {
        "message": stub
    };

    function tryEnableInput() {
        if (connected && username) {
            form.classList.remove("hidden");
        }
    }

    const setUsername = (name) => {
        username = name;
        updateLastInteract();
        tryEnableInput();
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
        vibrateIfNeeded(settings.vibrate, lastInteractTime);
        return true;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        updateLastInteract();
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
        textInput.classList.remove("good");
    });

    function on(name, f) {
        handlers[name] = f;
    }

    const onConnect = () => {
        connected = true;
        tryEnableInput();
    };

    const actionKeys = () => Object.keys(handlers);

    return {
        on,
        onConnect,
        actionKeys,
        onMessage
    };
}
