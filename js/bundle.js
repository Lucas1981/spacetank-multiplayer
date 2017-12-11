/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

class Thing {
  constructor(x, y, direction, color) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.color = color;
    this.status = true;
    this.timeCreated = new Date();
    this.direction = direction;
    this.timer = new Date();
  }

  cos(val) {
    return Math.cos(val * Math.PI / 180);
  }

  sin(val) {
    return Math.sin(val * Math.PI / 180);
  }

  destroy() {
    this.status = false;
  }

  isAlive() {
    return this.status;
  }

}
/* harmony export (immutable) */ exports["a"] = Thing;



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return KeyboardInput; });
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




/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

const CONTROL_CONFIG = [
  {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
    fire: 'zero'
  },
  {
    up: 'altUp',
    down: 'altDown',
    left: 'altLeft',
    right: 'altRight',
    fire: 'space'
  }
];
/* harmony export (immutable) */ exports["a"] = CONTROL_CONFIG;



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Node__ = __webpack_require__(11);
/* jshint esversion: 6 */



class LinkedList {
  constructor() {
    this.head = new __WEBPACK_IMPORTED_MODULE_0__Node__["a" /* Node */]('head');
  }

  head() {
    return this.head;
  }

  first() {
    return this.head.next;
  }

  find(item) {
    let currNode = this.head;
    while(currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  insert(newElement, item) {
    let newNode = new __WEBPACK_IMPORTED_MODULE_0__Node__["a" /* Node */](newElement);
    let current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }

  push(newElement) {
    let newNode = new __WEBPACK_IMPORTED_MODULE_0__Node__["a" /* Node */](newElement);
    let currNode = this.head;
    while(currNode.next != null) {
      currNode = currNode.next;
    }
    currNode.next = newNode;
  }

  findPrevious(item) {
    let currNode = this.head;
    while(
      currNode.next !== null &&
      currNode.next.element != item
    ) {
      currNode = currNode.next;
    }
    return currNode;
  }

  remove(item) {
    let prevNode = this.findPrevious(item);
    if(prevNode !== null) {
      prevNode.next = prevNode.next.next;
    }
  }

  display() {
    let currNode = this.head;
    while(currNode.next !== null) {
      currNode = currNode.next;
    }
  }
}
/* harmony export (immutable) */ exports["a"] = LinkedList;



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

class NextAnimationFrameFactory {

  constructor() {

		var originalWebkitMethod;
		var wrapper = null;
		var callback = null;
		var geckoVersion = 0;
		var userAgent = navigator.userAgent;
		var index = 0;
		var self = this;

		// Workaround for Chrome 10 bug where Chrome
		// does not pass the time to the animation function

		if(window.webkitRequestAnimationFrame){
			// Define the wrapper

			wrapper = function(time){
				if(time === undefined){
					time = +new Date();
				}
				self.callback(time);
			};

			// Make the switch

			originalWebkitMethod = window.webkitRequestAnimationFrame;

			window.webkitRequestAnimationFrame = function(callback, element){
				self.callback = callback;

				// Browser calls wrapper; wrapper calls callback

				originalWebkitMethod(wrapper, element);
			}
		} // End Chrome 10 workaround

		// Workaround for Gecko 2.0, which has a bug in mozRequestAnimationFrame() that restricts animations to 30-40 fps.

		if(window.mozRequestAnimationFrame){
			// Check the Gecko verson. Gecko is used by browsers other than Firefox. Gecko 2.0 corresponds to Firefox 4.0.

			index = userAgent.indexOf('rv:');

			if(userAgent.indexOf('Gecko') != -1){
				geckoVersion = userAgent.substr(index + 3, 3);

				if(geckoVersion === '2.0'){
					// Forces the return statement to fall through to the setTimeout() function.

					window.mozRequestAnimationFrame = undefined;
				}
			}
		} // End Gecko 2.0 workaround

		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||

			function(callback, element){
				var start;
				var finish;

				window.setTimeout(function(){
					start = +new Date();
					callback(start);
					finish = +new Date();

					self.timeout = 1000 / 60 - (finish - start);
				}, self.timeout);
			};
		}
}
/* harmony export (immutable) */ exports["a"] = NextAnimationFrameFactory;



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

class Sound {
  constructor() {
    var that = this;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.explosionSource = null;
    this.explosionSound = null;
    this.laserSound = new Audio('./wav/laser.wav');
    this.explosionFileBuffer = null;
    this.laserFileBuffer = null;

    let explosionPromise = new Promise((resolve, reject) => {
      that.loadWavFile('./wav/explosion.wav', function(buffer) {
        that.explosionFileBuffer = buffer;
        resolve();
      });
    });
    let laserPromise = new Promise((resolve, reject) => {
      that.loadWavFile('./wav/laser.wav', function(buffer) {
        that.laserFileBuffer = buffer;
        resolve();
      });
    });

    this.loadingPromise = Promise.all( [explosionPromise, laserPromise] );

  }

  getLoadingPromise() {
    return this.loadingPromise;
  }

  playLaserSound() {
    this.playSoundFromFileBuffer(this.laserFileBuffer);
  }

  playExplosionSound() {
    this.playSoundFromFileBuffer(this.explosionFileBuffer);
  }

  playSoundFromFileBuffer(fileBuffer) {
    let source = this.audioContext.createBufferSource();
    source.buffer = fileBuffer;
    source.connect(this.audioContext.destination);
    source.start(0);
  }

  loadWavFile(filename, callback) {
    let request = new XMLHttpRequest();
    let thisBuffer = null;
    let that = this;
    request.open('GET', filename, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      that.audioContext.decodeAudioData(request.response, function(buffer) {
        let source = that.audioContext.createBufferSource();
        source.buffer = buffer;
        callback(buffer);
      }, function(err) {
        console.log('There was an error');
        console.log(err);
      });
    };
    request.send();
  }

}
/* harmony export (immutable) */ exports["a"] = Sound;



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Star__ = __webpack_require__(12);
/* jshint esversion: 6 */



class Stars {
  constructor(maxWidth, maxHeight, amount) {
    this.stars = [];
    for(let i = 0; i < amount; i++) {
      let x = Math.round(Math.random() * maxWidth);
      let y = Math.round(Math.random() * maxHeight);
      let brightness = Math.round(Math.random() * 55);
      let radius = Math.round(Math.random() * 1) + 1;
      this.stars.push(new __WEBPACK_IMPORTED_MODULE_0__Star__["a" /* Star */](x, y, brightness, radius));
    }
  }

  draw(ctx) {
    this.stars.forEach(function(star) {
      star.draw(ctx);
    });
  }

}
/* harmony export (immutable) */ exports["a"] = Stars;



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bullet__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bullet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Bullet__);
/* jshint esversion: 6 */




const POINTS = [
  { x: 20, y: 0 },
  { x: -10, y: 10 },
  { x: -5, y: 0 },
  { x: -10, y: -10}
];

const TIME_TO_NEXT_SHOT = 150;
const TIME_TO_NEXT_EXPLOSION = 500;
const ROTATION_IN_DEGREES_PER_SECOND = 180 / 1000;
const ADVANCEMENT_IN_PIXELS_PER_SECOND = 200 / 1000;
const BACK_UP_IN_PIXELS_PER_SECOND = 100 / 1000;
const DEBUG = false;

class Tank extends __WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */] {
  constructor(x, y, direction, maxWidth, maxHeight, color, controls, controlsMap, things, sound, animationFactory) {
    super(x, y, direction, color);
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.momentLastFired = new Date() - TIME_TO_NEXT_SHOT;
    this.momentLastExploded = new Date() - TIME_TO_NEXT_EXPLOSION;
    this.lastProgressMoment = new Date();
    this.controls = controls;
    this.controlsMap = controlsMap;
    this.sound = sound;
    this.explosion = animationFactory.getNewExplosionAnimation();
    this.things = things;
  }

  draw(ctx) {
    let rotatedPoints = null;
    if(!this.noExplosionInProgress()) {
      this.explosion.draw(this.x, this.y, ctx);
    }
    else {
      rotatedPoints = this.getRotatedPoints();
      ctx.beginPath();
      for(let i = 0; i < rotatedPoints.length; i++) {
        let method = (i === 0) ? 'moveTo' : 'lineTo';
        ctx[method](this.x + rotatedPoints[i].x, this.y + rotatedPoints[i].y);
      }
      ctx.fillStyle = this.color;
      ctx.closePath();
      ctx.fill();
    }

    if(DEBUG) {
      ctx.beginPath();
      ctx.moveTo(this.maxWidth / 2, this.maxHeight / 2);
      ctx.lineTo(this.maxWidth / 2 + this.cos(this.direction) * 20, this.maxHeight / 2 + this.sin(this.direction) * 20);
      ctx.strokeStyle = "blue";
      ctx.stroke();
    }

  }

  progress() {
    let now = new Date();
    let elapsedTime = now - this.lastProgressMoment;
    if(this.controls[this.controlsMap.left]) {
      this.rotateLeft(elapsedTime);
    }
    if(this.controls[this.controlsMap.right]) {
      this.rotateRight(elapsedTime);
    }
    if(this.controls[this.controlsMap.up]) {
      this.advance(elapsedTime);
    }
    if(this.controls[this.controlsMap.down]) {
      this.backUp(elapsedTime);
    }
    if(this.controls[this.controlsMap.fire]) {
      this.shoot();
    }
    this.lastProgressMoment = now;
  }

  rotateLeft(timeDelta) {
    let step = ROTATION_IN_DEGREES_PER_SECOND * timeDelta;
    this.direction = (this.direction - step);
  }

  rotateRight(timeDelta) {
    let step = ROTATION_IN_DEGREES_PER_SECOND * timeDelta;
    this.direction = (this.direction + step);
  }

  advance(timeDelta) {
    let step = ADVANCEMENT_IN_PIXELS_PER_SECOND * timeDelta;
    let increaseX = this.cos(this.direction) * step;
    let increaseY = this.sin(this.direction) * step;
    if(this.x + increaseX > 0 && this.x + increaseX < this.maxWidth)
      this.x += increaseX;
    if(this.y + increaseY > 0 && this.y + increaseY < this.maxHeight)
      this.y += increaseY;
  }

  backUp(timeDelta) {
    let step = BACK_UP_IN_PIXELS_PER_SECOND * timeDelta;
    let increaseX = this.cos(this.direction) * step;
    let increaseY = this.sin(this.direction) * step;
    if(this.x - increaseX > 0 && this.x - increaseX < this.maxWidth)
      this.x -= increaseX;
    if(this.y - increaseY > 0 && this.y - increaseY < this.maxHeight)
      this.y -= increaseY;
  }

  shoot() {
    if(this.allowedToShoot()) {
      let tip = this.getTip();
      let bullet = new __WEBPACK_IMPORTED_MODULE_1__Bullet__["Bullet"](tip.x, tip.y, this.direction, this);
      this.things.push(bullet);
      this.sound.playLaserSound();
      this.momentLastFired = new Date();
    }
  }

  explode() {
    if(this.noExplosionInProgress()) {
      this.sound.playExplosionSound();
      this.momentLastExploded = this.explosion.reset();
    }
  }

  setControls(controls) {
    this.controls = controls;
  }

  allowedToShoot() {
    let now = new Date();
    return now - this.momentLastFired >= TIME_TO_NEXT_SHOT;
  }

  noExplosionInProgress() {
    let now = new Date();
    return now - this.momentLastExploded >= TIME_TO_NEXT_EXPLOSION;
  }

  getTip() {
    let newX = POINTS[0].x * this.cos(this.direction) - POINTS[0].y * this.sin(this.direction);
    let newY = POINTS[0].y * this.cos(this.direction) + POINTS[0].x * this.sin(this.direction);
    return {
      x: this.x + newX,
      y: this.y + newY
    };
  }

  getColorId() {
    return this.color;
  }

  shouldDie() {
    return false;
  }

  canShoot() {
    return true;
  }

  getPoints() {
    return POINTS;
  }

  getRotatedPoints() {
    let rotatedPoints = [];
    for(let i = 0; i < POINTS.length; i++) {
      let newX = POINTS[i].x * this.cos(this.direction) - POINTS[i].y * this.sin(this.direction);
      let newY = POINTS[i].y * this.cos(this.direction) + POINTS[i].x * this.sin(this.direction);
      rotatedPoints.push({ x: newX, y: newY });
    }
    return rotatedPoints;
  }

  getRotatedAndTransformedPoints() {
    let rotatedPoints = this.getRotatedPoints();
    let rotatedAndTransformedPoints = [];
    for(let i = 0; i < rotatedPoints.length; i++) {
      rotatedAndTransformedPoints[i] = {
        x: rotatedPoints[i].x + this.x,
        y: rotatedPoints[i].y + this.y
      };
    }
    return rotatedAndTransformedPoints;
  }

}
/* harmony export (immutable) */ exports["a"] = Tank;



/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Applications/XAMPP/xamppfiles/htdocs/javascript/spacetank/Bullet.js'");

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
/* harmony export (immutable) */ exports["a"] = Node;



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

class Star {
  constructor(x, y, brightness, radius) {
    this.x = x;
    this.y = y;
    this.brightness = brightness;
    this.radius = radius;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI);
    ctx.fillStyle = 'hsl(100, 0%, ' + this.brightness + '%)';
    ctx.fill();
    ctx.closePath();
  }
}
/* harmony export (immutable) */ exports["a"] = Star;



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NextAnimationFrame__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LinkedList__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Tank__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_KeyboardInput__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stars__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Sound__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CONTROL_CONFIG__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AnimationFactory__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AnimationFactory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__AnimationFactory__);
/* jshint esversion: 6 */










const MAX_WIDTH = 900;
const MAX_HEIGHT = 563;
const INITIAL_DIRECTION = 0;
const BACKGROUND = 'rgb(0, 0, 0)';
const DAWN_OF_TIME = new Date();
const RED = 'red';
const BLUE = 'blue';
const NUMBER_OF_STARS_IN_THE_SKY = 1000;
const TIME_TO_NEXT_GAME = 500;

function clearCanvas(ctx) {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
}

(function main() {
  let canvasPointer = document.getElementById('canvas');
  let context = canvasPointer.getContext("2d");
  let sound = new __WEBPACK_IMPORTED_MODULE_5__Sound__["a" /* Sound */]();
  let animationFactory = new __WEBPACK_IMPORTED_MODULE_7__AnimationFactory__["AnimationFactory"]();
  let things = null;
  let request = new __WEBPACK_IMPORTED_MODULE_0__NextAnimationFrame__["a" /* NextAnimationFrameFactory */]();
  let keyboardInput = new __WEBPACK_IMPORTED_MODULE_3__lib_KeyboardInput__["a" /* KeyboardInput */]();
  let activeTank = 0;
  let toggle = false;
  let sky = new __WEBPACK_IMPORTED_MODULE_4__Stars__["a" /* Stars */](MAX_WIDTH, MAX_HEIGHT, NUMBER_OF_STARS_IN_THE_SKY);
  let gameOver = false;
  let timeGameEnded = new Date();
  let tanks = null;
  let score = {
    red: 0,
    blue: 0
  };

  function newGame() {
    things = new __WEBPACK_IMPORTED_MODULE_1__LinkedList__["a" /* LinkedList */]();
    tanks = [ new __WEBPACK_IMPORTED_MODULE_2__Tank__["a" /* Tank */](
      MAX_WIDTH / 6,
      MAX_HEIGHT / 2,
      INITIAL_DIRECTION,
      MAX_WIDTH,
      MAX_HEIGHT,
      RED,
      keyboardInput.state,
      __WEBPACK_IMPORTED_MODULE_6__CONTROL_CONFIG__["a" /* CONTROL_CONFIG */][0],
      things,
      sound,
      animationFactory
    ), new __WEBPACK_IMPORTED_MODULE_2__Tank__["a" /* Tank */](
      MAX_WIDTH / 6 * 5,
      MAX_HEIGHT / 2,
      INITIAL_DIRECTION + 180,
      MAX_WIDTH,
      MAX_HEIGHT,
      BLUE,
      keyboardInput.state,
      __WEBPACK_IMPORTED_MODULE_6__CONTROL_CONFIG__["a" /* CONTROL_CONFIG */][1],
      things,
      sound,
      animationFactory
    ) ];
    for(let tank in tanks) things.push(tanks[tank]);
  }

  function initateWorld() {
    canvasPointer.width = MAX_WIDTH;
    canvasPointer.height = MAX_HEIGHT;
  }

  function drawScore() {
    context.font = "bold 32px 'Courier New'";
    context.textAlign="center";

    context.fillStyle = "red";
    context.fillText(score.red, MAX_WIDTH / 2 - 100, 50);

    context.fillStyle = "blue";
    context.fillText(score.blue, MAX_WIDTH / 2 + 100, 50);
  }

  function checkGameNeedsToBeReset() {
    if(gameOver === true) {
      let now = new Date();
      if(now - timeGameEnded >= TIME_TO_NEXT_GAME) {
        newGame();
        gameOver = false;
      }
    }
  }

  document.getElementById('reset-game-button').addEventListener('click', function() {
    for(let player in score) score[player] = 0;
    newGame();
  });

  document.getElementById('controls').addEventListener('click', function() {
    alert(
      'Controls:\n\nPlayer1:\nForward = Up arrow\nBackward = Down arrow\n' +
      'Rotate left = Left arrow\nRotate Right = Right arrow\n' +
      'Fire = 0\n\nPlayer2:\nForward = W\nBackward = S\n' +
      'Rotate left = A\nRotate right = D\nFire = Space bar'
    );
  });

  function loop() {

    clearCanvas(context);
    sky.draw(context);

    /* Move everything around and draw the world */
    for(let thing = things.first(); thing !== null; thing = thing.next) {
      if(thing.element.isAlive() === false) {
        things.remove(thing.element);
      }
      else {
        if(!gameOver) thing.element.progress();
        thing.element.draw(context);
      }
    }

    /* Check if anyone got hit */
    for(let thing = things.first(); thing !== null; thing = thing.next) {
      if(!thing.element.canShoot()) {
        let collider = thing.element.detectCollision(things);
        if(collider !== null) {
          things.remove(thing.element);
          gameOver = true;
          timeGameEnded = new Date();
          score[collider.element.getColorId()]++;
          collider.element.explode();
        }
      }
    }

    drawScore();
    checkGameNeedsToBeReset();
    request(loop);

  }

  animationFactory.getLoadingPromise().then(() => {
    sound.getLoadingPromise().then(() => {
      initateWorld();
      newGame();
      loop();
    });
  });

})();


/***/ },
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Applications/XAMPP/xamppfiles/htdocs/javascript/spacetank/AnimationFactory.js'");

/***/ }
/******/ ]);