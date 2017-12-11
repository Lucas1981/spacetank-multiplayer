/* jshint esversion: 6 */

import { Star } from './Star';

export class Stars {
  constructor(maxWidth, maxHeight, amount) {
    this.stars = [];
    for(let i = 0; i < amount; i++) {
      let x = Math.round(Math.random() * maxWidth);
      let y = Math.round(Math.random() * maxHeight);
      let brightness = Math.round(Math.random() * 55);
      let radius = Math.round(Math.random() * 1) + 1;
      this.stars.push(new Star(x, y, brightness, radius));
    }
  }

  draw(ctx) {
    this.stars.forEach((star) => {
      star.draw(ctx);
    });
  }

}
