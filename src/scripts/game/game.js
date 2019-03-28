import '../../styles/game/game.css';
import '../header-menu.js';
import './aiGame.js';

// const gamingMessage = document.querySelector('.gaming-message');
// const gameField = document.querySelector('.game-field');
// document.querySelector('.clear-field').addEventListener('click', clearGame);
//
// let moves = 0;
// global.moves = moves;
//
// const cross =
// `<svg class="symbol" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 80 80">
//             <g>
//               <polygon
//                 fill="#ff3f40"
//                 points="40,49.007 15.714,73.293 6.707,64.286 30.993,40 6.707,15.714 15.714,6.707 40,30.993    64.286,6.707 73.293,15.714 49.007,40 73.293,64.286 64.286,73.293  "
//               />
//             </g>
// </svg>`;
// const circle =
// `<svg class="symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
// (function renderGameField(num) {
//   for (let i = 0; i < num; i++) {
//     let cell = document.createElement('section');
//     cell.setAttribute('data-value', `${i+1}`);
//     cell.className = 'game-field__cell';
//     gameField.appendChild(cell);
//   }
//   return;
// })(9);
//
// const cells = document.querySelectorAll('.game-field__cell');
//
// const winCombinations = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [1, 4, 7],
//     [2, 5, 8],
//     [3, 6, 9],
//     [1, 5, 9],
//     [3, 5, 7],
// ];
//
// let dataX = [],
//     dataO = [],
//     winningCells = [];
// global.dataX = dataX;
// global.dataO = dataO;
//
//
// let player = cross,
//     winner;
//
//
// gameField.addEventListener('click', game_3x3_humans);
//
// function game_3x3_humans(event) {
//   const value = parseInt(event.target.getAttribute('data-value'), 10);
//   if (event.target.className === 'game-field__cell' && event.target.innerHTML === "") {
//     event.target.innerHTML = player;
//     moves++;
//     changePlayer(value);
//     if (moves === 9 && winner === undefined) {
//       gamingMessage.innerHTML = 'DRAWN GAME!';
//       moves = 0;
//       return;
//     }
//   }
// }
//
// function changePlayer(value) {
//   (player === cross) ?  dataX.push(value) :  dataO.push(value);
//   (player === cross) ?  checkTheWinner(dataX, value) :  checkTheWinner(dataO, value);
//
//   if (winner !== undefined) {return;}
//   player === cross ? (player = circle) : (player = cross);
//   gamingMessage.innerHTML = `${player} PLAYER'S MOVE`;
// }
//
// function checkTheWinner(arr, currentCell) {
//   if (arr.length > 2) {
//     let count = 0;
//     for (let i = 0; i < winCombinations.length; i++) {
//       if (winCombinations[i].indexOf(currentCell) !== -1) {
//         let winCombination = winCombinations[i];
//
//         for (let j = 0; j < winCombination.length; j++) {
//           if (arr.indexOf(winCombination[j]) !== -1) {
//             winningCells.push(arr[arr.indexOf(winCombination[j])] -1);
//             console.log(winningCells);
//             count++;
//           }
//           if (count === 3) {
//             winner = player;
//             for (let w = 0; w < winningCells.length; w++) {
//               cells[winningCells[w]].classList.add('victory-cell');
//             }
//             gamingMessage.innerHTML = `THE WINNER IS PLAYER - ${player}`;
//             gameField.removeEventListener('click', game_3x3_humans);
//             return;
//           }
//           continue;
//         }
//         count = 0;
//         winningCells = [];
//       }
//
//     }
//   } else return;
// }
//
// function clearGame() {
//   player = cross;
//   dataO = [];
//   dataX = [];
//   moves = 0;
//   gamingMessage.innerHTML = `${player} PLAYER'S MOVE`;
//
//   if (winner !== undefined) {
//     for (let w = 0; w < winningCells.length; w++) {
//       cells[winningCells[w]].classList.remove('victory-cell');
//     }
//   }
//   winner = undefined;
//   for (let i = 0; i < cells.length; i++) {
//     cells[i].innerHTML = '';
//   }
//   gameField.addEventListener('click', game_3x3_humans);
//   console.log(dataO, dataX, winningCells);
// }
