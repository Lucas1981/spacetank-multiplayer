/* jshint esversion: 6 */

import { Thing } from './Thing';

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

export class Tank extends Thing {
  constructor(x, y, direction, maxWidth, maxHeight, color, controls, things, sound, animationFactory) {
    super(x, y, direction, color);
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.momentLastFired = new Date() - TIME_TO_NEXT_SHOT;
    this.exploding = false;
    this.lastProgressMoment = new Date();
    this.controls = controls;
    this.controlsMap = {};
    this.sound = sound;
    this.explosion = animationFactory.getNewExplosionAnimation();
    this.things = things;
    this.shot = false;
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
      this.sound.playLaserSound();
      this.momentLastFired = new Date();
      this.shot = true;
    }
  }

  hasShot() {
    return this.shot === true;
  }

  handleShot() {
    this.shot = false;
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

  getDirection() {
    return this.direction;
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

  setControlsMap(map) {
    this.controlsMap = map;
  }

  getInfo() {
    return {
      direction: this.direction,
      x: this.x,
      y: this.y,
      shot: this.shot
    };
  }

  setInfo(info) {
    this.direction = info.direction;
    this.x = info.x;
    this.y = info.y;
    this.shot = info.shot;
  }

}
