/* jshint esversion: 6 */

export class Thing {
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
