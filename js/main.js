/* jshint esversion: 6 */

import { NextAnimationFrameFactory } from './NextAnimationFrame';
import { LinkedList } from './LinkedList';
import { Tank } from './Tank';
import { Bullet } from './Bullet';
import { KeyboardInput } from './KeyboardInput';
import { Stars } from './Stars';
import { Sound } from './Sound';
import { CONTROL_CONFIG } from './CONTROL_CONFIG';
import { AnimationFactory } from './AnimationFactory';
import { Canvas } from './Canvas';
import { attachEventHandlers } from './attach-event-handlers';

const MAX_WIDTH = 900;
const MAX_HEIGHT = 563;
const INITIAL_DIRECTION = 0;
const RED = 'red';
const BLUE = 'blue';
const NUMBER_OF_STARS_IN_THE_SKY = 1000;
const TIME_TO_NEXT_GAME = 500;

(function main() {

  /* Variables */

  let canvas = new Canvas(MAX_WIDTH, MAX_HEIGHT);
  let context = canvas.getContext();
  let sound = new Sound();
  let animationFactory = new AnimationFactory();
  let things = null;
  let request = new NextAnimationFrameFactory();
  let keyboardInput = new KeyboardInput();
  let activeTank = 0;
  let toggle = false;
  let sky = new Stars(MAX_WIDTH, MAX_HEIGHT, NUMBER_OF_STARS_IN_THE_SKY);
  let gameOver = false;
  let timeGameEnded = new Date();
  let tanks = null;
  let thisPlayer = -1;
  let thatPlayer = -1;
  let score = {
    red: 0,
    blue: 0
  };

  /* Initiation */

  firebase.auth().signInWithEmailAndPassword('another-user@nothing.xxx', 'Amsterdam123').catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });

  thisPlayer = parseInt(prompt('Are you player 0 or 1?'));
  thatPlayer = thisPlayer === 0 ? 1 : 0;

  attachEventHandlers(score, newGame);
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
    shareAndObtainTankInfo();
    detectCollision();
    canvas.drawScore(score.red, score.blue);

    if(checkGameNeedsToBeReset()) {
      newGame();
    }

    request(loop);

  }

  function shareAndObtainTankInfo() {
    let thisTankInfo = tanks[thisPlayer].getInfo();
    firebase.database().ref('users/' + thatPlayer).once('value').then(function(snapshot) {
      console.log(thisPlayer);
      tanks[thatPlayer].setInfo(snapshot.val());
    });
    firebase.database().ref('users/' + thisPlayer).set(thisTankInfo);
  }

  function moveAndDrawObjects() {
    for(let thing = things.first(); thing !== null; thing = thing.next) {
      if(thing.element.canShoot() && thing.element.hasShot()) {
        handleShot(things, thing.element);
      }
      if(thing.element.isAlive() === false) {
        things.remove(thing.element);
      }
      else {
        if(!gameOver) thing.element.progress();
        thing.element.draw(context);
      }
    }
  }

  function handleShot(things, tank) {
    let tip = tank.getTip();
    let direction = tank.getDirection();
    let bullet = new Bullet(tip.x, tip.y, direction, tank);
    things.push(bullet);
    tank.handleShot();
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
    things = new LinkedList();
    tanks = [ new Tank(
      MAX_WIDTH / 6,
      MAX_HEIGHT / 2,
      INITIAL_DIRECTION,
      MAX_WIDTH,
      MAX_HEIGHT,
      RED,
      keyboardInput.state,
      things,
      sound,
      animationFactory
    ), new Tank(
      MAX_WIDTH / 6 * 5,
      MAX_HEIGHT / 2,
      INITIAL_DIRECTION + 180,
      MAX_WIDTH,
      MAX_HEIGHT,
      BLUE,
      keyboardInput.state,
      things,
      sound,
      animationFactory
    ) ];
    tanks[thisPlayer].setControlsMap(CONTROL_CONFIG[0]);
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
