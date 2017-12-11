/* jshint esversion: 6 */

const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keySpace = 32; // space

const a = 65; // a
const d = 68; // d
const w = 87; // w
const s = 83; // s
const enter = 13; // enter
const zero = 48; // 0

const myTimer = 40; // 40 ms

let state = {
  up: false,
  down: false,
  left: false,
  right: false,
  z: false,
  x: false,
  space: false,
  toggle: false,
  suicide: false
};

function keyDownFunction(e) {

  let release = e;

  switch(release.keyCode) {
    case keyUp:
      state.up = true;
      break;
    case keyDown:
      state.down = true;
      break;
    case keyLeft:
      state.left = true;
      break;
    case keyRight:
      state.right = true;
      break;
    case keySpace:
      state.space = true;
      break;
    case w:
      state.altUp = true;
      break;
    case s:
      state.altDown = true;
      break;
    case a:
      state.altLeft = true;
      break;
    case d:
      state.altRight = true;
      break;
    case enter:
      state.enter = true;
      break;
    case zero:
      state.zero = true;
      break;
    default:
      break;
  }
}

function keyUpFunction(e) {

  let release = e;

  switch(release.keyCode) {
    case keyUp:
      state.up = false;
      break;
    case keyDown:
      state.down = false;
      break;
    case keyLeft:
      state.left = false;
      break;
    case keyRight:
      state.right = false;
      break;
    case keySpace:
      state.space = false;
      break;
    case w:
      state.altUp = false;
      break;
    case s:
      state.altDown = false;
      break;
    case a:
      state.altLeft = false;
      break;
    case d:
      state.altRight = false;
      break;
    case enter:
      state.enter = false;
      break;
    case zero:
      state.zero = false;
      break;
    default:
      break;
  }
}

class KeyboardInput {

  constructor() {
    document.addEventListener('keydown', keyDownFunction);
    document.addEventListener('keyup', keyUpFunction);
  }

  get state() {
    return state;
  }

  destructor() {
    document.removeEventListener('keydown', keyDownFunction);
    document.removeEventListener('keyup', keyUpFunction);
  }

}

export { KeyboardInput };
