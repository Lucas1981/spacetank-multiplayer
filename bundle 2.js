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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
/* harmony export (immutable) */ exports["a"] = Point;



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

class Vector {
  constructor(point) {
     if (point === undefined) {
        this.x = 0;
        this.y = 0;
     }
     else {
        this.x = point.x;
        this.y = point.y;
     }
  }

   getMagnitude() {
      return Math.sqrt(Math.pow(this.x, 2) +
                       Math.pow(this.y, 2));
   }

   dotProduct(vector) {
      return this.x * vector.x +
             this.y * vector.y;
   }

   add(vector) {
      var v = new Vector();
      v.x = this.x + vector.x;
      v.y = this.y + vector.y;
      return v;
   }

   subtract(vector) {
      var v = new Vector();
      v.x = this.x - vector.x;
      v.y = this.y - vector.y;
      return v;
   }

   normalize() {
      var v = new Vector(0, 0),
          m = this.getMagnitude();

      if (m != 0) {
         v.x = this.x / m;
         v.y = this.y / m;
      }
      return v;
   }

   perpendicular() {
      var v = new Vector();
      v.x = this.y;
      v.y = 0-this.x;
      return v;
   }

   edge(vector) {
      return this.subtract(vector);
   }

   normal() {
      var p = this.perpendicular();
      return p.normalize();
   }
}
/* harmony export (immutable) */ exports["a"] = Vector;



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

class Projection {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  overlaps(projection) {
    return this.max > projection.min && projection.max > this.min;
  }
}
/* harmony export (immutable) */ exports["a"] = Projection;



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

class Shape {
   constructor() {
     this.x = undefined;
     this.y = undefined;
   }

   collidesWith(shape) {
      var axes = this.getAxes().concat(shape.getAxes());
      return !this.separationOnAxes(axes, shape);
   }

   separationOnAxes(axes, shape) {
      for (var i=0; i < axes.length; ++i) {
         var axis = axes[i];
         var projection1 = shape.project(axis);
         var projection2 = this.project(axis);

         if (! projection1.overlaps(projection2)) {
            return true; // don't have to test remaining axes
         }
      }
      return false;
   }

   move(dx, dy) {
      throw 'move(dx, dy) not implemented';
   }

   createPath(context) {
      throw 'createPath(context) not implemented';
   }

   getAxes() {
      throw 'getAxes() not implemented';
   }

   project(axis) {
      throw 'project(axis) not implemented';
   }
}
/* harmony export (immutable) */ exports["a"] = Shape;



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Point__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = polygonCollidesWithCircle;
/* jshint esversion: 6 */




function getPolygonPointClosestToCircle(polygon, circle) {
   var min = 10000,
       length,
       testPoint,
       closestPoint;

   for (var i=0; i < polygon.points.length; ++i) {
      testPoint = polygon.points[i];
      length = Math.sqrt(Math.pow(testPoint.x - circle.x, 2),
                         Math.pow(testPoint.y - circle.y, 2));
      if (length < min) {
         min = length;
         closestPoint = testPoint;
      }
   }

   return closestPoint;
}

function polygonCollidesWithCircle(polygon, circle) {
   var min=10000, v1, v2,
       edge, perpendicular,
       axes = polygon.getAxes(),
       closestPoint = getPolygonPointClosestToCircle(polygon, circle);

   v1 = new __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* Vector */](new __WEBPACK_IMPORTED_MODULE_1__Point__["a" /* Point */](circle.x, circle.y));
   v2 = new __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* Vector */](new __WEBPACK_IMPORTED_MODULE_1__Point__["a" /* Point */](closestPoint.x, closestPoint.y));

   axes.push(v1.subtract(v2).normalize());

   return !polygon.separationOnAxes(axes, circle);
}


/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NextAnimationFrame__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LinkedList__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Tank__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_KeyboardInput__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stars__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Sound__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CONTROL_CONFIG__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AnimationFactory__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Canvas__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__attach_event_handlers__ = __webpack_require__(29);
/* jshint esversion: 6 */












const MAX_WIDTH = 900;
const MAX_HEIGHT = 563;
const INITIAL_DIRECTION = 0;
const RED = 'red';
const BLUE = 'blue';
const NUMBER_OF_STARS_IN_THE_SKY = 1000;
const TIME_TO_NEXT_GAME = 500;

(function main() {

  /* Variables */

  let canvas = new __WEBPACK_IMPORTED_MODULE_8__Canvas__["a" /* Canvas */](MAX_WIDTH, MAX_HEIGHT);
  let context = canvas.getContext();
  let sound = new __WEBPACK_IMPORTED_MODULE_5__Sound__["a" /* Sound */]();
  let animationFactory = new __WEBPACK_IMPORTED_MODULE_7__AnimationFactory__["a" /* AnimationFactory */]();
  let things = null;
  let request = new __WEBPACK_IMPORTED_MODULE_0__NextAnimationFrame__["a" /* NextAnimationFrameFactory */]();
  let keyboardInput = new __WEBPACK_IMPORTED_MODULE_3__lib_KeyboardInput__["a" /* KeyboardInput */]();
  let activeTank = 0;
  let toggle = false;
  let sky = new __WEBPACK_IMPORTED_MODULE_4__Stars__["a" /* Stars */](MAX_WIDTH, MAX_HEIGHT, NUMBER_OF_STARS_IN_THE_SKY);
  let gameOver = false;
  let timeGameEnded = new Date();
  let score = {
    red: 0,
    blue: 0
  };

  /* Initiation */

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__attach_event_handlers__["a" /* attachEventHandlers */])(score, newGame);
  animationFactory.getLoadingPromise().then(() => {
    sound.getLoadingPromise().then(() => {
      newGame();
      loop();
    });
  });

  /* Functions */

  function loop() {

    canvas.clearCanvas();
    sky.draw(context);
    moveAndDrawObjects();
    detectCollision();
    canvas.drawScore(score.red, score.blue);

    if(checkGameNeedsToBeReset()) {
      newGame();
    }

    request(loop);

  }

  function moveAndDrawObjects() {
    for(let thing = things.first(); thing !== null; thing = thing.next) {
      if(thing.element.isAlive() === false) {
        things.remove(thing.element);
      }
      else {
        if(!gameOver) thing.element.progress();
        thing.element.draw(context);
      }
    }
  }

  function detectCollision() {
    for(let thing = things.first(); thing !== null; thing = thing.next) {
      if(!thing.element.canShoot()) {
        let collider = thing.element.detectCollision(things);
        if(collider !== null) {
          handleCollision(collider, thing);
        }
      }
    }
  }

  function handleCollision(collider, thing) {
    let otherPlayerColor;

    things.remove(thing.element);
    gameOver = true;
    timeGameEnded = new Date();
    otherPlayerColor = (collider.element.getColorId() == 'red' ? 'blue' : 'red');
    score[otherPlayerColor]++;
    collider.element.explode();
  }

  function newGame() {
    things = new __WEBPACK_IMPORTED_MODULE_1__LinkedList__["a" /* LinkedList */]();
    let tanks = [ new __WEBPACK_IMPORTED_MODULE_2__Tank__["a" /* Tank */](
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
    gameOver = false;
  }

  function checkGameNeedsToBeReset() {
    if(gameOver === true) {
      let now = new Date();
      if(now - timeGameEnded >= TIME_TO_NEXT_GAME) {
        return true;
      }
    }
    return false;
  }

})();


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(25)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Point__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Vector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Shape__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Projection__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__collision_helper_functions__ = __webpack_require__(4);
/* jshint esversion: 6 */







class Circle extends __WEBPACK_IMPORTED_MODULE_2__Shape__["a" /* Shape */] {
  constructor(x, y, radius) {
     super();
     this.x = x;
     this.y = y;
     this.radius = radius;
  }

  collidesWith(shape) {
     var point, length, min=10000, v1, v2,
         edge, perpendicular, normal,
         axes = shape.getAxes(), distance;

     if (axes === undefined) {  // circle
        distance = Math.sqrt(Math.pow(shape.x - this.x, 2) +
                             Math.pow(shape.y - this.y, 2));

        return distance < Math.abs(this.radius + shape.radius);
     }
     else {  // polygon
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__collision_helper_functions__["a" /* polygonCollidesWithCircle */])(shape, this);
     }
  }

  getAxes() {
     return undefined; // there are an infinite number of axes for circles
  }

  project(axis) {
     var scalars = [],
         point = new __WEBPACK_IMPORTED_MODULE_0__Point__["a" /* Point */](this.x, this.y),
         dotProduct = new __WEBPACK_IMPORTED_MODULE_1__Vector__["a" /* Vector */](point).dotProduct(axis);

     scalars.push(dotProduct);
     scalars.push(dotProduct + this.radius);
     scalars.push(dotProduct - this.radius);

     return new __WEBPACK_IMPORTED_MODULE_3__Projection__["a" /* Projection */](Math.min.apply(Math, scalars),
                           Math.max.apply(Math, scalars));
  }
}
/* harmony export (immutable) */ exports["a"] = Circle;



/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Point__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Projection__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Shape__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Vector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__collision_helper_functions__ = __webpack_require__(4);
/* jshint esversion: 6 */







class Polygon extends __WEBPACK_IMPORTED_MODULE_2__Shape__["a" /* Shape */] {
  constructor() {
    super();
    this.points = [];
  }

  collidesWith(shape) {
     var axes = shape.getAxes();

     if (axes === undefined) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__collision_helper_functions__["a" /* polygonCollidesWithCircle */])(this, shape);
     }
     else {
        axes.concat(this.getAxes());
        return !this.separationOnAxes(axes, shape);
     }
  }

  getAxes() {
     var v1, v2, edge, perpendicular, normal, axes = [];

     for (var i=0; i < this.points.length-1; i++) {
        v1 = new __WEBPACK_IMPORTED_MODULE_3__Vector__["a" /* Vector */](this.points[i]);
        v2 = new __WEBPACK_IMPORTED_MODULE_3__Vector__["a" /* Vector */](this.points[i+1]);
        axes.push(v1.edge(v2).normal());
     }

     v1 = new __WEBPACK_IMPORTED_MODULE_3__Vector__["a" /* Vector */](this.points[this.points.length-1]);
     v2 = new __WEBPACK_IMPORTED_MODULE_3__Vector__["a" /* Vector */](this.points[0]);
     axes.push(v1.edge(v2).normal());

     return axes;
  }

  project(axis) {
     var scalars = [];

     this.points.forEach( function (point) {
        scalars.push(new __WEBPACK_IMPORTED_MODULE_3__Vector__["a" /* Vector */](point).dotProduct(axis));
     });

     return new __WEBPACK_IMPORTED_MODULE_1__Projection__["a" /* Projection */](Math.min.apply(Math, scalars),
                           Math.max.apply(Math, scalars));
  }

  addPoint(x, y) {
     this.points.push(new __WEBPACK_IMPORTED_MODULE_0__Point__["a" /* Point */](x,y));
  }
}
/* harmony export (immutable) */ exports["a"] = Polygon;



/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

class Animation {
  constructor(framesPerSecond, image, frameWidth, frameHeight, numberOfFrames, framesPerRow) {
    this.image = image;
    this.frame = 0;
    this.framesPerSecond = framesPerSecond;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.numberOfFrames = numberOfFrames;
    this.framesPerRow = framesPerRow;
    this.start = new Date();
  }

  reset() {
    this.start = new Date();
    return this.start;
  }

  draw(x, y, ctx) {
    let now = new Date();
    let elapsedTime = now - this.start;
    let offsetX, offsetY;

    this.frame = Math.round(this.framesPerSecond * elapsedTime);

    if(this.frame > this.numberOfFrames) {
      return false;
    }
    else {
      offsetX = this.frame % this.framesPerRow;
      offsetY = parseInt(this.frame / this.framesPerRow);

      ctx.drawImage(
        this.image,
        offsetX * this.frameWidth,
        offsetY * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        x - this.frameWidth / 2,
        y - this.frameHeight / 2,
        this.frameWidth,
        this.frameHeight
      );
      return true;
    }
  }
}
/* harmony export (immutable) */ exports["a"] = Animation;



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Animation__ = __webpack_require__(11);
/* jshint esversion: 6 */



const FRAMES_PER_SECOND = 32 / 1000;
const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 64;
const NUMBER_OF_FRAMES = 16;
const FRAMES_PER_ROW = 4;

class AnimationFactory {
  constructor() {
    let that = this;
    this.image = new Image();

    this.image.src = './img/explosion.png';
    this.loadingPromise = new Promise((resolve, reject) => {
      that.image.onload = () => {
        resolve();
      };
    });
  }

  getLoadingPromise(){
    return this.loadingPromise;
  }

  getNewExplosionAnimation() {
    return new __WEBPACK_IMPORTED_MODULE_0__Animation__["a" /* Animation */](
      FRAMES_PER_SECOND,
      this.image,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      NUMBER_OF_FRAMES,
      FRAMES_PER_ROW
    );
  }
}
/* harmony export (immutable) */ exports["a"] = AnimationFactory;



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CollisionMediator__ = __webpack_require__(15);
/* jshint esversion: 6 */




const MAX_AGE = 500;
const PIXELS_PER_SECOND = 500 / 1000;
const COLOR = 'green';
const RADIUS = 5;
const DEBUG = false;

let collisionMediator = new __WEBPACK_IMPORTED_MODULE_1__CollisionMediator__["a" /* CollisionMediator */]();

class Bullet extends __WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */] {
  constructor(x, y, direction, parent) {
    super(x, y, direction, COLOR);
    this.radius = RADIUS;
    this.speed = PIXELS_PER_SECOND;
    this.timeCreated = new Date();
    this.parent = parent;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  progress() {
    let now = new Date();
    let elapsedTime = now - this.timer;
    let step = PIXELS_PER_SECOND * elapsedTime;
    this.x += this.cos(this.direction) * step;
    this.y += this.sin(this.direction) * step;
    this.timer = now;
    if(this.shouldDie()) this.destroy();
  }

  detectCollision(things) {
    for(let thing = things.first(); thing != null; thing = thing.next) {
      if(
        thing.element.canShoot() &&
        !this.isParent(thing.element) &&
        collisionMediator.bulletCollidesWithTank(this, thing.element)
      ) {
        return thing;
      }
    }

    return null;
  }

  shouldDie() {
    let now = new Date();
    return now - this.timeCreated > MAX_AGE;
  }

  canShoot() {
    return false;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getRadius() {
    return this.radius;
  }

  isParent(thing) {
    return thing == this.parent;
  }

  getParent() {
    return this.parent;
  }

}
/* harmony export (immutable) */ exports["a"] = Bullet;



/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_Circle__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_Polygon__ = __webpack_require__(10);
/* jshint esversion: 6 */




class CollisionMediator {
  constructor() {

  }

  bulletCollidesWithTank(bullet, tank) {

    let points = tank.getRotatedAndTransformedPoints();
    let circle = new __WEBPACK_IMPORTED_MODULE_0__lib_Circle__["a" /* Circle */](bullet.getX(), bullet.getY(), bullet.getRadius());
    let firstPolygon = new __WEBPACK_IMPORTED_MODULE_1__lib_Polygon__["a" /* Polygon */]();
    let secondPolygon = new __WEBPACK_IMPORTED_MODULE_1__lib_Polygon__["a" /* Polygon */]();

    firstPolygon.addPoint(points[0].x, points[0].y);
    firstPolygon.addPoint(points[1].x, points[1].y);
    firstPolygon.addPoint(points[2].x, points[2].y);

    secondPolygon.addPoint(points[0].x, points[0].y);
    secondPolygon.addPoint(points[2].x, points[2].y);
    secondPolygon.addPoint(points[3].x, points[3].y);

    if(circle.collidesWith(firstPolygon) || circle.collidesWith(secondPolygon)) return true;

    return false;

  }
}
/* harmony export (immutable) */ exports["a"] = CollisionMediator;



/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Node__ = __webpack_require__(18);
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
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

class Sound {
  constructor() {
    let that = this;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.explosionSource = null;
    this.explosionSound = null;
    this.laserSound = new Audio('./wav/laser.wav');
    this.explosionFileBuffer = null;
    this.laserFileBuffer = null;

    let explosionPromise = new Promise((resolve, reject) => {
      that.loadWavFile('./wav/explosion.wav', (buffer) => {
        that.explosionFileBuffer = buffer;
        resolve();
      });
    });
    let laserPromise = new Promise((resolve, reject) => {
      that.loadWavFile('./wav/laser.wav', (buffer) => {
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
    request.onload = () => {
      that.audioContext.decodeAudioData(request.response, (buffer) => {
        let source = that.audioContext.createBufferSource();
        source.buffer = buffer;
        callback(buffer);
      }, (err) => {
        console.log('There was an error');
        console.log(err);
      });
    };
    request.send();
  }

}
/* harmony export (immutable) */ exports["a"] = Sound;



/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Star__ = __webpack_require__(20);
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
    this.stars.forEach((star) => {
      star.draw(ctx);
    });
  }

}
/* harmony export (immutable) */ exports["a"] = Stars;



/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bullet__ = __webpack_require__(13);
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
    this.exploding = false;
    this.lastProgressMoment = new Date();
    this.controls = controls;
    this.controlsMap = controlsMap;
    this.sound = sound;
    this.explosion = animationFactory.getNewExplosionAnimation();
    this.things = things;
  }

  draw(ctx) {
    let rotatedPoints = null;
    if(this.explosionInProgress()) {
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
      let bullet = new __WEBPACK_IMPORTED_MODULE_1__Bullet__["a" /* Bullet */](tip.x, tip.y, this.direction, this);
      this.things.push(bullet);
      this.sound.playLaserSound();
      this.momentLastFired = new Date();
    }
  }

  explode() {
    this.sound.playExplosionSound();
    this.explosion.reset();
    this.exploding = true;
  }

  setControls(controls) {
    this.controls = controls;
  }

  allowedToShoot() {
    let now = new Date();
    return now - this.momentLastFired >= TIME_TO_NEXT_SHOT;
  }

  explosionInProgress() {
    return this.exploding;
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)(undefined);
// imports


// module
exports.push([module.i, ".st-body {\n  background: #222222;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  text-align: center;\n}\n\n.st-header {\n  color: green;\n  font-family: 'Courrier New', Courier\n}\n\n.st-canvas {\n  height: 563px;\n  width: 900px;\n}\n", ""]);

// exports


/***/ },
/* 24 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(26);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 26 */
/***/ function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_style_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__main__);




/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

const BACKGROUND = 'rgb(0, 0, 0)';

class Canvas {
  constructor(maxWidth, maxHeight, background) {
    this.canvasPointer = document.getElementById('canvas');
    this.context = this.canvasPointer.getContext("2d");
    this.canvasPointer.width = maxWidth;
    this.canvasPointer.height = maxHeight;
  }

  getContext() {
    return this.context;
  }

  clearCanvas() {
    this.context.fillStyle = BACKGROUND;
    this.context.fillRect(0, 0, this.canvasPointer.width, this.canvasPointer.height);
  }

  drawScore(red, blue) {
    this.context.font = "bold 32px 'Courier New'";
    this.context.textAlign = "center";

    this.context.fillStyle = "red";
    this.context.fillText(red, this.canvasPointer.width / 2 - 100, 50);

    this.context.fillStyle = "blue";
    this.context.fillText(blue, this.canvasPointer.width / 2 + 100, 50);
  }

}
/* harmony export (immutable) */ exports["a"] = Canvas;



/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = attachEventHandlers;
/* jshint esversion: 6 */

function attachEventHandlers(score, newGame) {

  let resetGameButton = document.getElementById('reset-game-button');
  resetGameButton.addEventListener('click', () => {
    for(let player in score) score[player] = 0;
    newGame();
    resetGameButton.blur();
  });

  let controlsButton = document.getElementById('controls');
  controlsButton.addEventListener('click', () => {
    alert(
      'Controls:\n\nPlayer1:\nForward = Up arrow\nBackward = Down arrow\n' +
      'Rotate left = Left arrow\nRotate Right = Right arrow\n' +
      'Fire = 0\n\nPlayer2:\nForward = W\nBackward = S\n' +
      'Rotate left = A\nRotate right = D\nFire = Space bar'
    );
    controlsButton.blur();
  });
  
}


/***/ }
/******/ ]);