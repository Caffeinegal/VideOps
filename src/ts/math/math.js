"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = clamp;
exports.lerp = lerp;
function clamp(min, max, v) {
    return v > max ? max : v < min ? min : v;
}
function lerp(start, end, v) {
    return start + (end - start) * v;
}
