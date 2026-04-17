"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
const $debug = document.querySelector('#debug');
function log(...data) {
    $debug.textContent = data.join('\n');
}
