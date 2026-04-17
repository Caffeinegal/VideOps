"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
exports.createEnemy = createEnemy;
exports.advanceEnemy = advanceEnemy;
exports.getValue = getValue;
const config_1 = require("./config");
var Type;
(function (Type) {
    Type["Basic"] = "Basic";
    Type["Spinner"] = "Spinner";
    Type["ZigZag"] = "ZigZag";
    Type["Oscillator"] = "Oscillator";
})(Type || (exports.Type = Type = {}));
function createEnemy(type, position) {
    const pos = position || { angle: Math.random() * Math.PI * 2, radius: config_1.WORLD_SIZE };
    return {
        age: 0,
        initialPosition: pos,
        position: pos,
        type,
        direction: [-1, 1][Math.random() * 2 | 0]
    };
}
function advanceEnemy(data) {
    data.enemy.age += data.deltaTime;
    data.enemy.position = movePatterns[data.enemy.type](data);
}
const movePatterns = {
    Basic({ enemy, deltaTime }) {
        const newPos = {
            angle: enemy.position.angle,
            radius: enemy.position.radius - deltaTime * 100
        };
        return newPos;
    },
    Spinner({ enemy, deltaTime }) {
        const newPos = {
            angle: enemy.position.angle + enemy.direction * deltaTime * 1,
            radius: enemy.position.radius - deltaTime * 100
        };
        return newPos;
    },
    ZigZag({ enemy, deltaTime }) {
        const angle = enemy.initialPosition.angle + enemy.direction * Math.sin(enemy.age) * Math.PI;
        const newPos = {
            angle,
            radius: enemy.position.radius - deltaTime * 50
        };
        return newPos;
    },
    Oscillator({ enemy, deltaTime }) {
        const angle = enemy.position.angle + enemy.direction * deltaTime * 1;
        const radius = Math.sin(enemy.age * 10) * 50 + config_1.WORLD_SIZE / 2 - enemy.age * 50;
        const newPos = {
            angle,
            radius
        };
        return newPos;
    }
};
function getValue(type) {
    const values = {
        [Type.Basic]: 5,
        [Type.Spinner]: 10,
        [Type.ZigZag]: 15,
        [Type.Oscillator]: 20
    };
    return values[type];
}
