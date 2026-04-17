"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const config_1 = require("./config");
const world_1 = require("./world");
function init($canvas) {
    const ctx = $canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-atop';
    return {
        draw: (data) => draw($canvas, ctx, data)
    };
}
const colors = {
    enemy: `hsl(120, 100%, 50%)`,
    particle: `hsl(300, 100%, 50%)`,
    center: `hsl(260, 100%, 50%)`,
    player: `hsl(0, 100%, 50%)`,
    projectile: `hsl(60, 100%, 50%)`,
};
function draw($canvas, ctx, { playerPosition, projectiles, enemies, particles }) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    drawCenter();
    drawPlayer();
    drawProjectiles();
    drawEnemies();
    drawParticles();
    drawMask();
    function drawMask() {
        const mask = ctx.createRadialGradient(config_1.WORLD_SIZE / 2, config_1.WORLD_SIZE / 2, config_1.WORLD_SIZE * 0.4, config_1.WORLD_SIZE / 2, config_1.WORLD_SIZE / 2, config_1.WORLD_SIZE / 2);
        mask.addColorStop(0, '#ffff');
        mask.addColorStop(1, '#0000');
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillStyle = mask;
        ctx.fillRect(0, 0, config_1.WORLD_SIZE, config_1.WORLD_SIZE);
    }
    function drawCenter() {
        drawCircle($canvas.width / 2, $canvas.height / 2, 5, colors.center);
        drawCircle($canvas.width / 2, $canvas.height / 2, config_1.CENTER_RADIUS, colors.center, true);
    }
    function drawPlayer() {
        drawCircle(playerPosition.x + $canvas.width / 2, playerPosition.y + $canvas.height / 2, config_1.PLAYER_SIZE, colors.player);
    }
    function drawProjectiles() {
        for (const projectile of projectiles) {
            const vector = (0, world_1.toRelativeVector)(projectile.position);
            drawCircle(vector.x, vector.y, config_1.PROJECTILE_SIZE, colors.projectile);
        }
    }
    function drawEnemies() {
        for (const enemy of enemies) {
            const vector = (0, world_1.toRelativeVector)(enemy.position);
            drawCircle(vector.x, vector.y, config_1.ENEMY_SIZE, colors.enemy);
        }
    }
    function drawParticles() {
        for (const particle of particles) {
            const color = `rgba(255, 0, 255, ${1 - particle.age / config_1.PARTICLE_LIFESPAN})`;
            drawCircle(particle.position.x, particle.position.y, config_1.PARTICLE_SIZE, color);
        }
    }
    function drawCircle(x, y, r, color, hollow) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.shadowColor = color;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
        if (hollow) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        else {
            ctx.fillStyle = color;
            ctx.fill();
        }
        // reset
        ctx.shadowBlur = 0;
    }
}
