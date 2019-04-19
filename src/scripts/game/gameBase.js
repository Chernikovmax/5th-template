const DEFAULT_BOARD = [0, 1, 2, 3, 4, 5, 6, 7, 8];
export const FIRST_PLAYER = 'cross';
export const SECOND_PLAYER = 'circle';

export const CROSS_ICON =  `<svg class="symbol" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 80 80">
            <g>
              <polygon
                fill="#ff3f40"
                points="40,49.007 15.714,73.293 6.707,64.286 30.993,40 6.707,15.714 15.714,6.707 40,30.993    64.286,6.707 73.293,15.714 49.007,40 73.293,64.286 64.286,73.293  "
              />
            </g>
</svg>`;

export const CIRCLE_ICON = `<svg class="symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 438.533 438.533" style="enable-background:new 0 0 438.533 438.533;" xml:space="preserve">
  <g fill="#0080ff">
    <path d="M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0
      c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267
      c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407
      s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062
      C438.533,179.485,428.732,142.795,409.133,109.203z M353.742,297.208c-13.894,23.791-32.736,42.633-56.527,56.534
      c-23.791,13.894-49.771,20.834-77.945,20.834c-28.167,0-54.149-6.94-77.943-20.834c-23.791-13.901-42.633-32.743-56.527-56.534
      c-13.897-23.791-20.843-49.772-20.843-77.941c0-28.171,6.949-54.152,20.843-77.943c13.891-23.791,32.738-42.637,56.527-56.53
      c23.791-13.895,49.772-20.84,77.943-20.84c28.173,0,54.154,6.945,77.945,20.84c23.791,13.894,42.634,32.739,56.527,56.53
      c13.895,23.791,20.838,49.772,20.838,77.943C374.58,247.436,367.637,273.417,353.742,297.208z"/>
  </g>
</svg>`;

export class GameBase {
  constructor() {
    this.board = [...DEFAULT_BOARD];
    this.movingPlayer = FIRST_PLAYER;
    this.winningCombinations = [];
  }

  renderBoard(selector) {
    const gameField = document.querySelector(selector);

    for (let i = 0; i < this.board.length; i++) {
      let cell = document.createElement('section');
      cell.setAttribute('data-value', `${i}`);
      cell.className = 'game-field__cell';
      gameField.appendChild(cell);
    }
  }

  movePlayer(cellNumber) {
    const cell = document.querySelector(`[data-value="${cellNumber}"]`);
    cell.innerHTML = (this.movingPlayer === FIRST_PLAYER) ? CROSS_ICON : CIRCLE_ICON;
    this.board[cellNumber] = this.movingPlayer;
    const emptyCellsOnBoard = (board) => this.getEmptyCells(board);
    if (emptyCellsOnBoard(this.board).length === 0) {
      return this.gameMessage.innerHTML = 'GAME OVER! GAMEBOARD IS FILLED OUT!';
    }
    // this.gameMessage.innerHTML =  `${(this.movingPlayer === FIRST_PLAYER)? CIRCLE_ICON : CROSS_ICON} PLAYER'S MOVE`;
    return;
  }

  getEmptyCells(board) {
    return board.filter(cell => cell !== FIRST_PLAYER && cell !== SECOND_PLAYER);
  }

  changePlayer() {
    if (this.movingPlayer === FIRST_PLAYER) {
      return this.movingPlayer = SECOND_PLAYER;
    } else {

      return this.movingPlayer = FIRST_PLAYER;
    }
  }

  didFinished(board, player) {

    switch (true) {
      case (board[0] === player && board[1] === player && board[2] === player):
        this.winningCombinations.push(0,1,2);
        return true;
      case (board[3] === player && board[4] === player && board[5] === player):
        this.winningCombinations.push(3,4,5);
        return true;
      case (board[6] === player && board[7] === player && board[8] === player):
        this.winningCombinations.push(6,7,8);
        return true;
      case (board[0] === player && board[3] === player && board[6] === player):
        this.winningCombinations.push(0,3,6);
        return true;
      case (board[1] === player && board[4] === player && board[7] === player):
        this.winningCombinations.push(1,4,7);
        return true;
      case (board[2] === player && board[5] === player && board[8] === player):
        this.winningCombinations.push(2,5,8);
        return true;
      case (board[0] === player && board[4] === player && board[8] === player):
        this.winningCombinations.push(0,4,8);
        return true;
      case (board[2] === player && board[4] === player && board[6] === player):
        this.winningCombinations.push(2,4,6);
        return true;
    }
    return false;
  }

  start() {
    this.gameMods = document.querySelector('.game-mods');
    this.renderingArea = document.querySelector('.game-field');
    this.gameMessage = document.querySelector('#event-message');
    this.clearGameBtn = document.querySelector('.clear-field');
    this.renderingArea.innerHTML = '';
    this.gameMessage.classList.add('gaming-message--active');
    this.clearGameBtn.classList.add('clear-field--active');
    for (let i = 0; i < this.board.length; i++) {
      let cell = document.createElement('section');
      cell.setAttribute('data-value', `${i}`);
      cell.className = 'game-field__cell';
      this.renderingArea.appendChild(cell);
    }
    this.cellsOnBoard = document.querySelectorAll('.game-field__cell');
    return;
  }

  stop() {
    for (let i = 0; i < this.cellsOnBoard.length; i++) {
      this.cellsOnBoard[i].classList.remove('victory-cell');
      this.cellsOnBoard[i].innerHTML = '';
    }
    this.board = [...DEFAULT_BOARD];
    this.movingPlayer = FIRST_PLAYER;
    this.winningCombinations = [];
    this.gameMessage.innerHTML = `${CROSS_ICON} PLAYER'S MOVE`;
    return;
  }
}
