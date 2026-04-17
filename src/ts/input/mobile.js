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
    const joystick = document.querySelector('#joystick');
    const handle = document.querySelector('#handle');
    const plane = document.querySelector('#mobile-plane');
    const fireButton = document.querySelector('#button-fire');
    return {
        getInput,
        setActive,
        setInactive
    };
    function setActive(ready) {
        handle.addEventListener('touchstart', onHandleGrab);
        handle.addEventListener('touchend', onHandleRelease);
        plane.addEventListener('touchmove', onMove);
        if (fireButton) {
            fireButton.addEventListener('touchstart', onFireGrab, false);
            fireButton.addEventListener('touchend', onFireRelease, false);
            fireButton.removeEventListener('touchcancel', onFireRelease, false);
        }
        plane.hidden = false;
        ready();
    }
    function setInactive() {
        handle.removeEventListener('touchstart', onHandleGrab);
        handle.removeEventListener('touchend', onHandleRelease);
        plane.removeEventListener('touchmove', onMove);
        if (fireButton) {
            fireButton.removeEventListener('touchstart', onFireGrab);
            fireButton.removeEventListener('touchend', onFireRelease);
            fireButton.removeEventListener('touchcancel', onFireRelease);
        }
        plane.hidden = true;
    }
    function onMove(event) {
        event.preventDefault();
        if (!moving)
            return;
        const touch = event.touches[0];
        const rect = joystick.getBoundingClientRect();
        const x = touch.pageX - (rect.x + rect.width / 2);
        const y = touch.pageY - (rect.y + rect.height / 2);
        const { x: nx, y: ny } = (0, vector_1.normalize)({ x, y });
        position = {
            x: nx,
            y: ny
        };
        handle.style.transform = `translate(${nx * 56.26}px, ${ny * 56.25}px)`;
    }
}
let moving = false;
function getInput() {
    return {
        axes: position,
        fire
    };
}
function onHandleGrab() {
    moving = true;
}
function onHandleRelease() {
    moving = false;
}
function onFireGrab() {
    fire = true;
}
function onFireRelease() {
    fire = false;
}
