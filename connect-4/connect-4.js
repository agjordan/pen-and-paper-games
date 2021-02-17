//playing area
const GRID_HEIGHT = 6;
const GRID_WIDTH = 7;

const PLAYERS = 2;
let currentPlayer = 1;
let playerColor = ["blue", "red"];

const game = document.getElementById("game");

const generateGrid = (height, width) => {
  let grid = [];
  for (let i = 0; i < height; i++) {
    grid[i] = [];
    for (let j = 0; j < width; j++) {
      grid[i].push("");
    }
  }
  return grid;
};

let grid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
let gameinfo = document.getElementById("gameinfo");

const updateDisplay = () => {
  let display = "";
  for (row in grid) {
    display += `<div class="row row${row}">`;
    for (column in grid[row]) {
      switch (grid[row][column]) {
        case "":
          display += `<wired-card class="cell ${row},${column}"></wired-card>`;
          break;
        default:
          display += `<wired-card fill="${
            playerColor[grid[row][column] - 1]
          }" class="cell ${row},${column} round">${grid[row][column]}</wired-card>`;
          break;
      }
    }
    display += "</div>";
  }
  game.innerHTML = display;
};

const markCells = (column) => {
  for (let row = GRID_HEIGHT - 1; row >= 0; row--) {
    if (grid[row][column]) continue;
    grid[row][column] = currentPlayer;
    updateDisplay();
    checkWinCondition();
    nextPlayer();
    break;
  }
};

const nextPlayer = () => {
  if (currentPlayer === PLAYERS) {
    currentPlayer = 1;
  } else {
    currentPlayer++;
  }
};

const checkWinCondition = () => {
  setTimeout(function () {
    for (let row = 0; row < GRID_HEIGHT; row++) {
      for (let column = 0; column < GRID_WIDTH; column++) {
        if (
          grid[row][column] &&
          column + 3 < GRID_WIDTH &&
          grid[row][column] == grid[row][column + 3] &&
          grid[row][column] == grid[row][column + 2] &&
          grid[row][column] == grid[row][column + 1]
        ) {
          nextPlayer();
          alert(`Winner: Player${currentPlayer}`);
        } else if (
          grid[row][column] &&
          row + 3 < GRID_HEIGHT &&
          grid[row][column] == grid[row + 3][column] &&
          grid[row][column] == grid[row + 2][column] &&
          grid[row][column] == grid[row + 1][column]
        ) {
          nextPlayer();
          alert(`Winner: Player${currentPlayer}`);
        } else if (
          grid[row][column] &&
          row + 3 < GRID_WIDTH &&
          column + 3 < GRID_HEIGHT &&
          grid[row][column] == grid[row + 3][column+3] &&
          grid[row][column] == grid[row + 2][column+2] &&
          grid[row][column] == grid[row + 1][column+1]
        ) {
          nextPlayer();
          alert(`Winner: Player${currentPlayer}`);
        } else if (
          grid[row][column] &&
          row + 3 < GRID_WIDTH &&
          column - 3 > 0 &&
          grid[row][column] == grid[row + 3][column-3] &&
          grid[row][column] == grid[row + 2][column-2] &&
          grid[row][column] == grid[row + 1][column-1]
        ) {
          nextPlayer();
          alert(`Winner: Player${currentPlayer}`);
        }
      }
    }
  }, 50);
};

const clearGrid = () => {
  document.getElementById("startGame").innerText = "Reset";
  grid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
  updateDisplay();
};

game.addEventListener("click", (event) => {
  let column = event.target.classList[1].split(",")[1];
  markCells(column);
});
