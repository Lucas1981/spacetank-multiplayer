/* jshint esversion: 6 */

const BACKGROUND = 'rgb(0, 0, 0)';

export class Canvas {
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
