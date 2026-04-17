"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoom = createBoom;
exports.createPaticle = createPaticle;
const polar_vector_1 = require("./math/polar-vector");
const config_1 = require("./config");
function createBoom(position, count = 32) {
    const particles = [];
    const alpha = Math.PI * 2 / count;
    for (let i = 0; i < count; i += 1) {
        particles.push(createPaticle(position, (0, polar_vector_1.toVector)({ angle: alpha * i, radius: config_1.PARTICLE_SPEED })));
    }
    return particles;
}
function createPaticle(position, velocity) {
    return {
        age: 0,
        position,
        velocity
    };
}
