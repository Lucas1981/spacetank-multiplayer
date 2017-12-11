/* jshint esversion: 6 */

export function attachEventHandlers(score, newGame) {

  let resetGameButton = document.getElementById('reset-game-button');
  resetGameButton.addEventListener('click', () => {
    for(let player in score) score[player] = 0;
    newGame();
    resetGameButton.blur();
  });

  let controlsButton = document.getElementById('controls');
  controlsButton.addEventListener('click', () => {
    alert(
      'Controls:\n\nPlayer1:\nForward = Up arrow\nBackward = Down arrow\n' +
      'Rotate left = Left arrow\nRotate Right = Right arrow\n' +
      'Fire = 0\n\nPlayer2:\nForward = W\nBackward = S\n' +
      'Rotate left = A\nRotate right = D\nFire = Space bar'
    );
    controlsButton.blur();
  });
  
}
