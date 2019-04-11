import {GameBase, DEFAULT_BOARD, FIRST_PLAYER, SECOND_PLAYER, CROSS_ICON, CIRCLE_ICON} from './gameBase.js';

export class TwoPlayersGame extends GameBase {
  constructor() {
    super();
    this.start();
    this._addListeners();
    this.gameListener = true;
    this.gameMod;
  }

  game_3x3_2players(event) {
    if (event.target.className !== 'game-field__cell' && event.target.innerHTML !== "") {
      return;
    }
    let clickedCellIndex = parseInt(event.target.getAttribute('data-value'), 10);

    this.movePlayer.bind(this);
    this.movePlayer(clickedCellIndex);

    this._isWinner(this.board, this.movingPlayer);


    this.changePlayer.bind(this);
    this.changePlayer();
  }

  _addListeners() {
    this.gameMod = () => this.game_3x3_2players(event);
    this.renderingArea.addEventListener('click', this.gameMod);
    this.clearGameBtn.addEventListener('click', () => {
      this.stop();
      if (!this.gameListener) {
        this.renderingArea.addEventListener('click', this.gameMod);
        this.gameListener = true;
      }
    }, {once: true});
    this.gameMods.addEventListener('mousedown', _deleteCurrentInstance, {once: true});
  }

  _isWinner(board, player) {
    if (!this.didFinished(board, player)) {
      return;
    }

    while (this.winningCombinations.length > 0) {
      this.cellsOnBoard[this.winningCombinations.pop()].classList.add('victory-cell');
    }
    this.renderingArea.removeEventListener('click', this.gameMod);
    this.gameListener = false;
    this.gameMessage.innerHTML = `GAME OVER: ${(this.movingPlayer === FIRST_PLAYER) ? 'FIRST PLAYER WIN!' : 'SECOND PLAYER WIN!'}`;
  }
  _deleteCurrentInstance() {
    this.stop();
    this.renderingArea.removeEventListener('click', this.currentGameMod);
  }
}
