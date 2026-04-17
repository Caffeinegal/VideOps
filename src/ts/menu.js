"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const input_1 = require("./input");
const INPUT_TYPE_KEY = 'psi_input_type';
function init(start, stop, inputChange) {
    const inputType = localStorage.getItem(INPUT_TYPE_KEY);
    const $menu = document.querySelector('#menu');
    window.addEventListener('keydown', handleKeyDown);
    const $startButton = document.querySelector('#start-button');
    $startButton.addEventListener('click', onStart);
    inputChange(input_1.InputSource.Mouse);
    const $radios = document.querySelector('#input-source');
    const selectedType = [...$radios.querySelectorAll('input')].find(input => input.value == inputType);
    if (selectedType) {
        selectedType.checked = true;
        inputChange(input_1.InputSource[inputType]);
    }
    $radios.addEventListener('change', () => {
        const selected = $radios.querySelector('input:checked').value;
        localStorage.setItem(INPUT_TYPE_KEY, input_1.InputSource[selected]);
        inputChange(input_1.InputSource[selected]);
    });
    window.addEventListener('blur', show);
    function onStart() {
        document.querySelector('html').requestFullscreen().catch(console.error);
        hide();
    }
    function show() {
        $menu.hidden = false;
        stop();
    }
    function hide() {
        $menu.hidden = true;
        start();
    }
    function handleKeyDown({ key }) {
        if (key == 'Escape') {
            if ($menu.hidden) {
                show();
            }
            else {
                hide();
            }
        }
    }
    const $gameOver = document.querySelector('#game-over');
    return {
        setGameOver() {
            document.querySelector('.score').hidden = true;
            $gameOver.hidden = false;
            window.removeEventListener('blur', show);
            window.removeEventListener('keydown', handleKeyDown);
        }
    };
}
