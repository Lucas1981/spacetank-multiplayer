/* jshint esversion: 6 */

export class Sound {
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
