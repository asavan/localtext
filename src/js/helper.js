"use strict";

export function hideElem(el) {
    if (el) {
        el.classList.add("hidden");
    }
}

export function showElem(el) {
    if (el) {
        el.classList.remove("hidden");
    }
}

export function removeElem(el) {
    if (el) {
        el.remove();
    }
}

function logToHtml(settings, message, el) {
    if (!el) {
        return;
    }
    if (typeof message == "object") {
        el.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + "<br />";
    } else {
        el.innerHTML += message + "<br />";
    }
}

export function log(message, el) {
    logToHtml(message, el);
    console.log(message);
}

export function error(settings, message, el) {
    logToHtml(settings, message, el);
    console.error(message);
}

function stringToBoolean(string){
    switch(string.toLowerCase().trim()){
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case null: return false;
    default: return Boolean(string);
    }
}

export function parseSettings(window, document, settings) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams) {
        if (typeof settings[key] === "number") {
            settings[key] = parseInt(value, 10);
        } else if (typeof settings[key] === "boolean") {
            settings[key] = stringToBoolean(value);
        } else {
            settings[key] = value;
        }
    }
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function promiseState(promise) {
    const pendingState = { status: "pending" };

    return Promise.race([promise, pendingState]).then(
        (value) =>
            value === pendingState ? value : { status: "fulfilled", value },
        (reason) => ({ status: "rejected", reason }),
    );
}

export function assert(b, message) {
    if (b) return;
    console.error(message);
    throw message;
}

export function pluralize(count, noun, suffix = "s"){
    return `${count} ${noun}${count !== 1 ? suffix : ""}`;
}
