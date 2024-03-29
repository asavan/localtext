"use strict";

import starter from "./js/starter.js";
import { minidenticonSvg } from "minidenticons";

// eslint-disable-next-line no-undef
if (__USE_SERVICE_WORKERS__) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", {scope: "./"});
    }
}

starter(window, document);
window.minidenticonSvg = minidenticonSvg;
