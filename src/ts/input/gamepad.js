"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const EMPTY_INPUT = {
    axes: {
        x: 0,
        y: 0,
    },
    fire: false,
};
function init() {
    let bready = () => { };
    let bstop = () => { };
    return {
        getInput,
        setActive,
        setInactive
    };
    function setActive(ready, stop) {
        bready = ready;
        bstop = stop;
        window.addEventListener("gamepadconnected", onConnected, false);
        window.addEventListener("gamepaddisconnected", onDisconncted, false);
    }
    function setInactive() {
        window.removeEventListener("gamepadconnected", onConnected, false);
        window.removeEventListener("gamepaddisconnected", onDisconncted, false);
    }
    function onConnected({ gamepad }) {
        console.log('connected', gamepad);
        bready();
    }
    function onDisconncted({ gamepad }) {
        console.log('disconnected', gamepad);
        bstop();
    }
}
function getInput() {
    const gamepads = navigator.getGamepads();
    if (!gamepads)
        return EMPTY_INPUT;
    const gamepad = Object.values(gamepads).find((gp) => gp);
    if (!gamepad)
        return EMPTY_INPUT;
    const axes = {
        x: gamepad.axes[0],
        y: gamepad.axes[1]
    };
    return {
        axes,
        fire: [0, 5, 7].map((i) => gamepad.buttons[i]).some((button) => button.pressed),
    };
}
