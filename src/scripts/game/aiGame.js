import {GameBase, DEFAULT_BOARD, FIRST_PLAYER, SECOND_PLAYER, CROSS_ICON, CIRCLE_ICON} from './gameBase.js';

export class AIGameMod extends GameBase {
  constructor() {
    super();
    this.start();
    this._addListeners();
    this.gameListener = true;
    this.currentGameMod;
  }

  game_3x3_withAi(event) {
    if (event.target.className !== 'game-field__cell' && event.target.innerHTML !== "") {
      return;
    }
    let clickedCellIndex = parseInt(event.target.getAttribute('data-value'), 10);
    const moveP = (i) => this.movePlayer(i);
    moveP(clickedCellIndex);

    this._isWinner(this.board, FIRST_PLAYER);

    this.changePlayer.bind(this);
    this.changePlayer();

    let aiCell = this.minimax(this.board, SECOND_PLAYER).index;
    moveP(aiCell);

    this._isWinner(this.board, SECOND_PLAYER);

    this.changePlayer();
  }

  minimax(newBoard, player) {
    const availCells = this.getEmptyCells(newBoard);

    if (this.didFinished(newBoard, FIRST_PLAYER, 'forecast')) {
    return {score:-10};
    }
      else if (this.didFinished(newBoard, SECOND_PLAYER, 'forecast')){
        return {score:10};
      }
        else if (availCells.length === 0){
          return {score:0};
        }

    let moves = [];

    for (let i = 0; i < availCells.length; i++) {
      let move = {};
      move.index = newBoard[availCells[i]];

      newBoard[availCells[i]] = player;

      if ( player === SECOND_PLAYER) {
        const result = this.minimax(newBoard, FIRST_PLAYER);
        move.score = result.score;
      }
        else {
          const result = this.minimax(newBoard, SECOND_PLAYER);
          move.score = result.score;
        }

      newBoard[availCells[i]] = move.index;
      moves.push(move);
    }
    let bestMove;
    if (player === SECOND_PLAYER) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for(let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  _isWinner(board, player) {
    if (!this.didFinished(board, player)) {
      return;
    }
    for (let i = 0; i < 3; i++) {
      this.cellsOnBoard[this.winningCombinations.pop()].classList.add('victory-cell');
    }
    this.renderingArea.removeEventListener('click', this.currentGameMod);
    this.gameListener = false;
    this.gameMessage.innerHTML = `GAME OVER: ${(this.movingPlayer === FIRST_PLAYER) ? 'PLAYER WIN!' : 'AI PLAYER WIN!'}`;
  }

  _addListeners() {
    this.currentGameMod = () => this.game_3x3_withAi(event);
    this.renderingArea.addEventListener('click', this.currentGameMod);
    this.clearGameBtn.addEventListener('click', () => {
      this.stop();
      if (!this.gameListener) {
        this.renderingArea.addEventListener('click', this.currentGameMod);
        this.gameListener = true;
      }
    });
    this.gameMods.addEventListener('mousedown', this._deleteCurrentInstance.bind(this), {once: true});
  }

  _deleteCurrentInstance() {
    this.stop();
    this.renderingArea.removeEventListener('click', this.currentGameMod);
  }
}
