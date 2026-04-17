"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRelativeVector = toRelativeVector;
const config_1 = require("./config");
const polar_vector_1 = require("./math/polar-vector");
function toRelativeVector(polarVector) {
    const vec = (0, polar_vector_1.toVector)(polarVector);
    return {
        x: vec.x + config_1.WORLD_SIZE / 2,
        y: vec.y + config_1.WORLD_SIZE / 2
    };
}
