import {GameBase, DEFAULT_BOARD, FIRST_PLAYER, SECOND_PLAYER, CROSS_ICON, CIRCLE_ICON} from './gameBase.js';

export class AIGameMod extends GameBase {
  constructor() {
    super();
    this.start();
    this._cellListener();
    this.gameListener = true;
    this.gameMod;
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

      // this.didFinished.bind(this);
      // this.didFinished(this.board, this.movingPlayer, undefined);
      // if (this.didFinished(this.board, this.movingPlayer, undefined)) {
      //   this.renderingArea.removeEventListener('click', this.gameMod);
      //   this.gameListener = false;
      // };

      let aiCell = this.minimax(this.board, SECOND_PLAYER).index;
      // if (aiCell === undefined) {
      //   this.gameMessage = ``
      //   return;
      // }
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
  _cellListener() {
    this.gameMod = () => this.game_3x3_withAi(event);
    this.renderingArea.addEventListener('click', this.gameMod);
    this.clearGameBtn.addEventListener('click', () => {
      this.stop();
      if (!this.gameListener) {
        this.renderingArea.addEventListener('click', this.gameMod);
        this.gameListener = true;
      }
    });
  }

  _isWinner(board, player) {
    if (!this.didFinished(board, player)) {
      return;
    }
    for (let i = 0; i < 3; i++) {
      this.cellsOnBoard[this.winningCombinations.pop()].classList.add('victory-cell');
    }
    this.renderingArea.removeEventListener('click', this.gameMod);
    this.gameListener = false;
    this.gameMessage.innerHTML = `GAME OVER: ${(this.movingPlayer === FIRST_PLAYER) ? 'PLAYER WIN!' : 'AI PLAYER WIN!'}`;
  }

}
