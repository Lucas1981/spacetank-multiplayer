/* jshint esversion: 6 */

import { Thing } from './Thing';
import { CollisionMediator } from './CollisionMediator';

const MAX_AGE = 500;
const PIXELS_PER_THOUSAND_MILISECONDS = 500 / 1000;
const COLOR = 'green';
const RADIUS = 5;
const DEBUG = false;

let collisionMediator = new CollisionMediator();

export class Bullet extends Thing {
  constructor(x, y, direction, parent) {
    super(x, y, direction, COLOR);
    this.radius = RADIUS;
    this.speed = PIXELS_PER_THOUSAND_MILISECONDS;
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
    let step = this.speed * elapsedTime;
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
