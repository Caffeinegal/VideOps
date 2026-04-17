import {InputSource} from './input';

const INPUT_TYPE_KEY = 'psi_input_type';

function isInputSource(value: string | null): value is InputSource {
  return value === InputSource.Gamepad || value === InputSource.Mouse || value === InputSource.Mobile;
}

export function init(start: () => void, stop: () => void, inputChange: (source: InputSource) => void) {
  const inputType = localStorage.getItem(INPUT_TYPE_KEY);

  const $menu = document.querySelector('#menu') as HTMLElement;
  window.addEventListener('keydown', handleKeyDown);

  const $startButton = document.querySelector('#start-button') as HTMLButtonElement;
  $startButton.addEventListener('click', onStart);

  inputChange(InputSource.Mouse);

  const $radios = document.querySelector('#input-source') as HTMLElement;

  const selectedType = [...$radios.querySelectorAll('input')].find((input) => input.value == inputType);
  if (selectedType && isInputSource(inputType)) {
    selectedType.checked = true;
    inputChange(inputType);
  }

  $radios.addEventListener('change', () => {
    const selected = ($radios.querySelector('input:checked') as HTMLInputElement).value;
    if (!isInputSource(selected)) {
      return;
    }
    localStorage.setItem(INPUT_TYPE_KEY, selected);
    inputChange(selected);
  });

  window.addEventListener('blur', show);

  function onStart() {
    document.documentElement.requestFullscreen().catch(console.error);
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

  function handleKeyDown({key}: KeyboardEvent) {
    if (key == 'Escape') {
      if ($menu.hidden) {
        show();
      } else {
        hide();
      }
    }
  }

  const $gameOver = document.querySelector('#game-over') as HTMLElement;

  return {
    setGameOver() {
      (document.querySelector('.score') as HTMLElement).hidden = true;
      $gameOver.hidden = false;
      window.removeEventListener('blur', show);
      window.removeEventListener('keydown', handleKeyDown);
    },
  };
}

