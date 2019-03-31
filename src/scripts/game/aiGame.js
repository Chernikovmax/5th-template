import {GameBase, DEFAULT_BOARD, FIRST_PLAYER, SECOND_PLAYER, CROSS_ICON, CIRCLE_ICON} from './gameBase.js';
//
// const gamingMessage = document.querySelector('.gaming-message');
// const gameField = document.querySelector('.game-field');
// document.querySelector('.clear-field').addEventListener('click', clearGame);

export class AIGameMod extends GameBase {
  constructor() {
    super();
  }

  game_3x3_withAi(event) {

    if (event.target.className !== 'game-field__cell' && event.target.innerHTML !== "") {
      return;
    }
      let clickedCellIndex = parseInt(event.target.getAttribute('data-value'), 10);
      this.board[clickedCellIndex] = FIRST_PLAYER;
      event.target.innerHTML = CROSS_ICON;
      let aiCell = minimax(SECOND_PLAYER).index;
      if (aiCell === undefined) {
        this.stop();
        return;
      }
      cells[aiCell].innerHTML = this.movingPlayer;
      this.board[aiCell] = SECOND_PLAYER;
      let huCell = minimax(FIRST_PLAYER).index;
      if (huCell === undefined) {
        this.gameMessage.innerHTML = 'GAME OVER';
        // gameField.removeEventListener('click', game_3x3_withAi);
        return;
      }
  }

  minimax(player) {
    const availCells = getEmptyCells();

    if (winning(FIRST_PLAYER)) {
    return {score:-10};
    }
      else if (winning(SECOND_PLAYER)){
        return {score:10};
      }
        else if (availCells.length === 0){
          return {score:0};
        }

    let moves = [];

    for (let i = 0; i < availCells.length; i++) {
      let move = {};
      move.index = this.board[availCells[i]];

      this.board[availCells[i]] = this.movingPlayer;

      if ( this.movingPlayer === SECOND_PLAYER) {
        const result = minimax(FIRST_PLAYER);
        move.score = result.score;
      }
        else {
          const result = minimax(SECOND_PLAYER);
          move.score = result.score;
        }

      this.board[availCells[i]] = move.index;
      moves.push(move);
    }
    let bestMove;
    if (this.movingPlayer === SECOND_PLAYER) {
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
}

const cells = document.querySelectorAll('.game-field__cell');
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
global.board = board;

// const huPlayer = `<svg class="symbol" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 80 80">
//             <g>
//               <polygon
//                 fill="#ff3f40"
//                 points="40,49.007 15.714,73.293 6.707,64.286 30.993,40 6.707,15.714 15.714,6.707 40,30.993    64.286,6.707 73.293,15.714 49.007,40 73.293,64.286 64.286,73.293  "
//               />
//             </g>
// </svg>`;
// const aiPlayer = `<svg class="symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
//      viewBox="0 0 438.533 438.533" style="enable-background:new 0 0 438.533 438.533;" xml:space="preserve">
//   <g fill="#0080ff">
//     <path d="M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0
//       c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267
//       c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407
//       s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062
//       C438.533,179.485,428.732,142.795,409.133,109.203z M353.742,297.208c-13.894,23.791-32.736,42.633-56.527,56.534
//       c-23.791,13.894-49.771,20.834-77.945,20.834c-28.167,0-54.149-6.94-77.943-20.834c-23.791-13.901-42.633-32.743-56.527-56.534
//       c-13.897-23.791-20.843-49.772-20.843-77.941c0-28.171,6.949-54.152,20.843-77.943c13.891-23.791,32.738-42.637,56.527-56.53
//       c23.791-13.895,49.772-20.84,77.943-20.84c28.173,0,54.154,6.945,77.945,20.84c23.791,13.894,42.634,32.739,56.527,56.53
//       c13.895,23.791,20.838,49.772,20.838,77.943C374.58,247.436,367.637,273.417,353.742,297.208z"/>
//   </g>
// </svg>`;
//
// function game_3x3_withAi(event) {
//
//   if (event.target.className === 'game-field__cell' && event.target.innerHTML === "") {
//     event.target.innerHTML = huPlayer;
//     let cellValue = parseInt(event.target.getAttribute('data-value'), 10);
//     board[cellValue] = huPlayer;
//     let aiCell = minimax(board, aiPlayer).index;
//     if (aiCell === undefined) {
//       gamingMessage.innerHTML = 'GAME OVER';
//       gameField.removeEventListener('click', game_3x3_withAi);
//       return;
//     }
//     cells[aiCell].innerHTML = aiPlayer;
//     board[aiCell] = aiPlayer;
//     let huCell = minimax(board, huPlayer).index;
//     if (huCell === undefined) {
//       gamingMessage.innerHTML = 'GAME OVER';
//       gameField.removeEventListener('click', game_3x3_withAi);
//       return;
//     }
//   }
// }

// function minimax(newBoard, player) {
//   const availCells = emptyIndices(newBoard);
//
//   if (winning(newBoard, huPlayer)) {
//   return {score:-10};
//   }
//     else if (winning(newBoard, aiPlayer)){
//       return {score:10};
//     }
//       else if (availCells.length === 0){
//         return {score:0};
//       }
//
//   let moves = [];
//
//   for (let i = 0; i < availCells.length; i++) {
//     let move = {};
//     move.index = newBoard[availCells[i]];
//
//     newBoard[availCells[i]] = player;
//
//     if ( player === aiPlayer) {
//       const result = minimax(newBoard, huPlayer);
//       move.score = result.score;
//     }
//       else {
//         const result = minimax(newBoard, aiPlayer);
//         move.score = result.score;
//       }
//
//     newBoard[availCells[i]] = move.index;
//     moves.push(move);
//   }
//   let bestMove;
//   if (player === aiPlayer) {
//     let bestScore = -10000;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   } else {
//     let bestScore = 10000;
//     for(let i = 0; i < moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   }
//   return moves[bestMove];
// }

// function emptyIndices(board){
//   return  board.filter(cell => cell !== aiPlayer && cell !== huPlayer);
// }

// function winning(board, player){
//   if(
//     (board[0] === player && board[1] === player && board[2] === player) ||
//     (board[3] === player && board[4] === player && board[5] === player) ||
//     (board[6] === player && board[7] === player && board[8] === player) ||
//     (board[0] === player && board[3] === player && board[6] === player) ||
//     (board[1] === player && board[4] === player && board[7] === player) ||
//     (board[2] === player && board[5] === player && board[8] === player) ||
//     (board[0] === player && board[4] === player && board[8] === player) ||
//     (board[2] === player && board[4] === player && board[6] === player)
//     ) {
//       return true;
//       }
//   return false;
// }

function clearGame() {
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  // moves.length = 0;
  gamingMessage.innerHTML = `PLAYER'S MOVE`;
  // winner = undefined;
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
  }
  gameField.addEventListener('click', game_3x3_withAi);
}
