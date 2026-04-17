"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const config_1 = require("./config");
const enemy_1 = require("./enemy");
const polar_vector_1 = require("./math/polar-vector");
const vector_1 = require("./math/vector");
const particle_1 = require("./particle");
const world_1 = require("./world");
let currentPosition = {
    x: 0,
    y: 1
};
let destination = {
    x: 0,
    y: 1
};
let gameOver = false;
const particles = [];
const projectiles = [];
const enemies = [
    (0, enemy_1.createEnemy)(enemy_1.Type.Basic),
];
let fireTimer = 0;
let spawnTimer = 0;
function init() {
    return {
        calculate
    };
}
function calculate({ input, deltaTime, addPoints }) {
    for (const pKey in particles) {
        const particle = particles[pKey];
        particle.age += deltaTime;
        if (particle.age > config_1.PARTICLE_LIFESPAN) {
            particles.splice(+pKey, 1);
            continue;
        }
        particle.position = (0, vector_1.add)(particle.position, particle.velocity);
    }
    if (!gameOver) {
        const mag = (0, vector_1.magnitude)(input.axes);
        if (mag > config_1.GAMEPAD_EPSILON) {
            destination = (0, vector_1.normalize)(input.axes);
        }
        currentPosition = (0, vector_1.slerp)(currentPosition, destination, deltaTime * config_1.PLAYER_SPEED);
        fireTimer += deltaTime;
        if (input.fire && fireTimer > config_1.FIRE_COOLDOWN) {
            fireTimer = 0;
            projectiles.push({
                position: { ...(0, polar_vector_1.toPolarVector)((0, vector_1.mulFactor)(currentPosition, 50)) }
            });
        }
        spawnTimer += deltaTime;
        if (spawnTimer > config_1.ENEMY_SPAWN_COOLDOWN) {
            spawnTimer = 0;
            const angle = Math.random() * Math.PI * 2;
            const types = Object.values(enemy_1.Type);
            enemies.push((0, enemy_1.createEnemy)(types[Math.random() * types.length | 0], { angle, radius: config_1.WORLD_SIZE / 2 }));
        }
        for (const projectile of projectiles) {
            projectile.position.radius += deltaTime * config_1.PROJECTILE_SPEED;
        }
        for (const enemy of enemies) {
            (0, enemy_1.advanceEnemy)({
                enemy,
                deltaTime,
            });
        }
        for (const enemy of enemies) {
            if (enemy.position.radius < config_1.CENTER_RADIUS + config_1.ENEMY_SIZE) {
                gameOver = true;
                for (let i = 0; i < 10; i += 1) {
                    setTimeout(() => particles.push(...(0, particle_1.createBoom)({ x: config_1.WORLD_SIZE / 2, y: config_1.WORLD_SIZE / 2 }, 4 + i * 4)), 100 * i);
                }
                break;
            }
        }
        projectiles: for (const pKey in projectiles) {
            for (const eKey in enemies) {
                const projectile = projectiles[pKey];
                const enemy = enemies[eKey];
                const dist = (0, polar_vector_1.distance)(projectile.position, enemy.position);
                if (dist < config_1.PROJECTILE_SIZE + config_1.ENEMY_SIZE) {
                    projectiles.splice(+pKey, 1);
                    enemies.splice(+eKey, 1);
                    const position = (0, world_1.toRelativeVector)(enemy.position);
                    particles.push(...(0, particle_1.createBoom)(position));
                    addPoints((0, enemy_1.getValue)(enemy.type));
                    continue projectiles;
                }
            }
        }
    }
    return {
        playerPosition: (0, vector_1.mulFactor)(currentPosition, config_1.PLAYER_OFFSET),
        projectiles,
        enemies,
        particles,
        gameOver
    };
}
