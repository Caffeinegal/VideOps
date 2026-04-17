"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const vector_1 = require("../math/vector");
let position = {
    x: 0,
    y: 0
};
let fire = false;
function init() {
    const canvas = document.querySelector('#canvas');
    return {
        getInput,
        setActive(ready) {
            canvas.addEventListener('mousedown', onMouseDown);
            canvas.addEventListener('mouseup', onMouseUp);
            canvas.addEventListener('mousemove', onMouseMove);
            ready();
        },
        setInactive() {
            canvas.removeEventListener('mousedown', onMouseDown);
            canvas.removeEventListener('mouseup', onMouseUp);
            canvas.removeEventListener('mousemove', onMouseMove);
        }
    };
    function onMouseDown() {
        fire = true;
    }
    function onMouseUp() {
        fire = false;
    }
    function onMouseMove({ clientX, clientY }) {
        const rect = canvas.getBoundingClientRect();
        const x = clientX - (rect.x + rect.width / 2);
        const y = clientY - (rect.y + rect.height / 2);
        const norm = (0, vector_1.normalize)({ x, y });
        position = norm;
    }
}
function getInput() {
    return {
        axes: position,
        fire: fire
    };
}
