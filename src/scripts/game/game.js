import '../../styles/game/game.css';
import '../header-menu.js';
import {AIGameMod} from './aiGame.js';
import {TwoPlayersGame} from './2playersGame.js';

const gameMods = document.querySelector('.game-mods');
// const gameField = document.querySelector('.game-field');
// const gameMessage = document.querySelector('.gaming-message');
// const clearGameBtn = document.querySelector('.clear-field');
let currentGame;
let cellsOnBoard;


gameMods.addEventListener('click', newGame);

function newGame(event) {

  if (event.target.id === 'ai-mod') {
    currentGame = new AIGameMod();
    global.currentGame = currentGame;
  } else
  if (event.target.id === 'two-players-mod') {
    currentGame = new TwoPlayersGame();
  }
  cellsOnBoard = document.querySelectorAll('.game-field__cell');
  return;
  // return cellsOnBoard.addEventListener('click', currentGame.);
}
