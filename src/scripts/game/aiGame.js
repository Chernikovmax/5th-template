import {GameBase, DEFAULT_BOARD, FIRST_PLAYER, SECOND_PLAYER, CROSS_ICON, CIRCLE_ICON} from './gameBase.js';

export class AIGameMod extends GameBase {
  constructor() {
    super();
    this.start();
    this._cellListener();
  }

  game_3x3_withAi(event) {
    if (event.target.className !== 'game-field__cell' && event.target.innerHTML !== "") {
      return;
    }
      let clickedCellIndex = parseInt(event.target.getAttribute('data-value'), 10);
      const moveP = (i) => this.movePlayer(i);
      moveP(clickedCellIndex);
      // if (this.didFinished(this.board, FIRST_PLAYER) === true) {
      //   alert('FINITO! HUMANWIN!')
      // }
      // console.log('1');
      // this.board[clickedCellIndex] = FIRST_PLAYER;
      // event.target.innerHTML = CROSS_ICON;
      let aiCell = this.minimax(this.board, SECOND_PLAYER);
      if (aiCell.index === undefined) {
        this.stop();
        return;
      }
      moveP(aiCell);
      // if (this.didFinished(this.board, FIRST_PLAYER) === true) {
      //   alert('FINITO! AIWIN!')
      // }
      // ()=>this.movePlayer(aiCell);
      // cells[aiCell].innerHTML = this.movingPlayer;
      // this.board[aiCell] = SECOND_PLAYER;
      let huCell = this.minimax(FIRST_PLAYER);
      if (huCell.index === undefined) {
        this.gameMessage.innerHTML = 'GAME OVER';
        // gameField.removeEventListener('click', game_3x3_withAi);
        return;
      }
  }

  minimax(newBoard, player) {
    const availCells = this.getEmptyCells(newBoard);

    if (this.didFinished(newBoard, FIRST_PLAYER)) {
    return {score:-10};
    }
      else if (this.didFinished(newBoard, SECOND_PLAYER)){
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
    this.renderingArea.addEventListener('click', this.game_3x3_withAi.bind(this));
  }
}
