/* jshint esversion: 6 */

export class Animation {
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
