"use strict"; // jshint ;_;

export default function enterName(window, document, callback) {
    const formCont = document.querySelector(".name-form-cont");
    const data = window.sessionStorage.getItem("username");
    if (data) {
        formCont.replaceChildren();
        callback(data);
        return;
    }

    const formItem = document.querySelector("#nameform");
    const formClone = formItem.content.cloneNode(true).firstElementChild;
    formCont.replaceChildren(formClone);

    const form = document.querySelector(".nameform");
    const input = document.querySelector(".nameinput");
    input.focus();

    function onName(name) {
        window.sessionStorage.setItem("username", name);
        callback(name);
        formCont.replaceChildren();
    }

    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        onName(input.value);
    });
}
