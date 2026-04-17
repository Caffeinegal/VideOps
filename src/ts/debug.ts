const $debug = document.querySelector('#debug');

export function log(...data: any[]) {
  if (!$debug) {
    return;
  }
  $debug.textContent = data.join('\n');
}
