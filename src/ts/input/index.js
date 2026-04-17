"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSource = void 0;
exports.init = init;
const gamepad_1 = require("./gamepad");
const mobile_1 = require("./mobile");
const mouse_1 = require("./mouse");
;
var InputSource;
(function (InputSource) {
    InputSource["Gamepad"] = "Gamepad";
    InputSource["Mouse"] = "Mouse";
    InputSource["Mobile"] = "Mobile";
})(InputSource || (exports.InputSource = InputSource = {}));
let inputSource = null;
let inputFunction = null;
function init(source, ready, stop) {
    const gamepad = (0, gamepad_1.init)();
    const mouse = (0, mouse_1.init)();
    const mobile = (0, mobile_1.init)();
    setInputSource(source);
    return {
        getInput,
        setInputSource,
        getInputSource
    };
    function setInputSource(source) {
        inputSource = source;
        if (inputFunction) {
            inputFunction.setInactive();
        }
        inputFunction = getInputFunction(source);
        inputFunction.setActive(ready, stop);
    }
    function getInputFunction(source) {
        switch (source) {
            case InputSource.Gamepad:
                return gamepad;
            case InputSource.Mobile:
                return mobile;
            case InputSource.Mouse:
                return mouse;
        }
    }
}
function getInput() {
    return inputFunction.getInput();
}
function getInputSource() {
    return inputSource;
}
