"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = normalize;
exports.magnitude = magnitude;
exports.slerp = slerp;
exports.lerp = lerp;
exports.dot = dot;
exports.add = add;
exports.subtract = subtract;
exports.mulFactor = mulFactor;
exports.distance = distance;
const math_1 = require("./math");
function normalize(vector) {
    const mag = magnitude(vector);
    return {
        x: mag ? vector.x / mag : 0,
        y: mag ? vector.y / mag : 0
    };
}
function magnitude(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}
function slerp(start, end, percent) {
    percent = (0, math_1.clamp)(0, 1, percent);
    const dt = dot(start, end);
    const theta = Math.acos(dt) * percent;
    const relative = normalize(subtract(end, mulFactor(start, dt)));
    return normalize(add(mulFactor(start, Math.cos(theta)), mulFactor(relative, Math.sin(theta))));
}
function lerp(start, end, percent) {
    return {
        x: (0, math_1.lerp)(start.x, end.x, percent),
        y: (0, math_1.lerp)(start.y, end.y, percent)
    };
}
function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}
function add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    };
}
function subtract(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    };
}
function mulFactor(vector, factor) {
    return {
        x: vector.x * factor,
        y: vector.y * factor
    };
}
function distance(a, b) {
    return magnitude({
        x: a.x - b.x,
        y: a.y - b.y
    });
}
