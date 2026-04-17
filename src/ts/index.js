"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const render_1 = require("./render");
const physics_1 = require("./physics");
const menu_1 = require("./menu");
const score_1 = require("./score");
const background_1 = require("./background");
const config_1 = require("./config");
(0, background_1.init)();
const $canvas = document.querySelector('#canvas');
$canvas.width = config_1.WORLD_SIZE;
$canvas.height = config_1.WORLD_SIZE;
let menuPause = true;
let inputPause = true;
const { getInput, setInputSource } = (0, input_1.init)(input_1.InputSource.Mouse, () => {
    inputPause = false;
}, () => {
    inputPause = true;
});
const { setGameOver } = (0, menu_1.init)(() => {
    menuPause = false;
}, () => {
    menuPause = true;
}, (source) => {
    inputPause = true;
    setInputSource(source);
});
const { addPoints } = (0, score_1.init)();
const { calculate } = (0, physics_1.init)();
const { draw } = (0, render_1.init)($canvas);
let lastTime = 0;
addPoints(0);
window.requestAnimationFrame(update);
function update(time) {
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;
    window.requestAnimationFrame(update);
    if (menuPause || inputPause)
        return;
    const input = getInput();
    const { playerPosition, projectiles, enemies, particles, gameOver } = calculate({
        input, deltaTime, addPoints
    });
    draw({
        playerPosition,
        projectiles,
        enemies,
        particles
    });
    if (gameOver) {
        setGameOver();
    }
}
