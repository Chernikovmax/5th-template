import {GameBase, DEFAULT_BOARD, FIRST_PLAYER, SECOND_PLAYER, CROSS_ICON, CIRCLE_ICON} from './gameBase.js';

export class TwoPlayersGame extends GameBase {
  constructor() {
    super();
    this.start();
    this._cellListener();
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

    this.didFinished.bind(this);
    this.didFinished(this.board, this.movingPlayer);
    if (this.didFinished(this.board, this.movingPlayer)) {
      this.renderingArea.removeEventListener('click', this.gameMod);
      this.gameListener = false;
    };

    this.changePlayer.bind(this);
    this.changePlayer();
  }

  _cellListener() {
    this.gameMod = () => this.game_3x3_2players(event);
    this.renderingArea.addEventListener('click', this.gameMod);
    this.clearGameBtn.addEventListener('click', () => {
      this.stop();
      if (!this.gameListener) {
        this.renderingArea.addEventListener('click', this.gameMod);
        this.gameListener = true;
      }
    });
  }

}
