"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toVector = toVector;
exports.toPolarVector = toPolarVector;
exports.distance = distance;
const vector_1 = require("./vector");
function toVector(polarVector) {
    return {
        x: polarVector.radius * Math.cos(polarVector.angle),
        y: polarVector.radius * Math.sin(polarVector.angle)
    };
}
function toPolarVector(vector) {
    return {
        radius: (0, vector_1.magnitude)(vector),
        angle: Math.atan2(vector.y, vector.x)
    };
}
function distance(a, b) {
    return Math.sqrt(a.radius ** 2 + b.radius ** 2 - 2 * a.radius * b.radius * Math.cos(a.angle - b.angle));
}
