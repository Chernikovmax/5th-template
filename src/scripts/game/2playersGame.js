import {GameBase, DEFAULT_BOARD, FIRST_PLAYER, SECOND_PLAYER, CROSS_ICON, CIRCLE_ICON} from './gameBase.js';

export class TwoPlayersGame extends GameBase {
  constructor() {
    super();
    this.start();
    this._cellListener();
  }

  game_3x3_2players(event) {
    if (event.target.className !== 'game-field__cell' && event.target.innerHTML !== "") {
      return;
    }
    let clickedCellIndex = parseInt(event.target.getAttribute('data-value'), 10);

    this.movePlayer.bind(this);
    this.movePlayer(clickedCellIndex);

    this.didFinished.bind(this);
    this.didFinished(this.board, this.movingPlayer);

    this.changePlayer.bind(this);
    this.changePlayer();

    const emptyCellsOnBoard = (board) => this.getEmptyCells(board);
    if (emptyCellsOnBoard(this.board).length === 0) {
      this.gameMessage.innerHTML = 'GAME OVER! GAMEBOARD IS FILLED OUT!';
      return;
    }
  }

  _cellListener() {
    this.renderingArea.addEventListener('click', this.game_3x3_2players.bind(this));
  }

}
