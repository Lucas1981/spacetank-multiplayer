/* jshint esversion: 6 */

export class Star {
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
