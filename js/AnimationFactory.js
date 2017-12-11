/* jshint esversion: 6 */

import { Animation } from './Animation';

const FRAMES_PER_SECOND = 32 / 1000;
const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 64;
const NUMBER_OF_FRAMES = 16;
const FRAMES_PER_ROW = 4;

export class AnimationFactory {
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
    return new Animation(
      FRAMES_PER_SECOND,
      this.image,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      NUMBER_OF_FRAMES,
      FRAMES_PER_ROW
    );
  }
}
