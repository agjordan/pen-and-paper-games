//playing area
const GRID_HEIGHT = 6;
const GRID_WIDTH = 7;

const PLAYERS = 2;

let currentPlayer = 1;
let playerColor = ["blue", "red"];

const GAME_ELEM = document.getElementById("game");

document.addEventListener("DOMContentLoaded", function () {
  GAME_ELEM.addEventListener("click", (event) => {
    let column = event.target.classList[1].split(",")[1];
    markGrid(gameGrid, column, currentPlayer);
    updateDisplay(gameGrid, GAME_ELEM);
    checkWinCondition(gameGrid, currentPlayer);
    currentPlayer = getNextPlayer(currentPlayer, PLAYERS);
  });

  document.getElementById("startGame").addEventListener("click", (event) => {
    event.target.innerText = "Reset";
    console.log("reset");
    gameGrid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
    updateDisplay(gameGrid, GAME_ELEM);
  });
});

export const generateGrid = (height, width) => {
  let grid = [];
  for (let i = 0; i < height; i++) {
    grid[i] = [];
    for (let j = 0; j < width; j++) {
      grid[i].push("");
    }
  }
  return grid;
};

let gameGrid = generateGrid(GRID_HEIGHT, GRID_WIDTH);

export const updateDisplay = (grid, elem) => {
  let display = "";
  for (let row in grid) {
    display += `<div class="row row${row}">`;
    for (let column in grid[row]) {
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
  elem.innerHTML = display;
};

export const markGrid = (grid, column, player) => {
  for (let row = grid.length - 1; row >= 0; row--) {
    if (grid[row][column]) continue;
    grid[row][column] = player;
    break;
  }
};

export const getNextPlayer = (current, total) => {
  if (current === total) {
    return (current = 1);
  } else {
    return ++current;
  }
};

export const checkWinCondition = (grid, player) => {
  setTimeout(function () {
    let height = grid.length
    let width = grid[0].length
    console.log(grid)
    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        if (
          grid[row][column] &&
          column + 3 < width &&
          grid[row][column] == grid[row][column + 3] &&
          grid[row][column] == grid[row][column + 2] &&
          grid[row][column] == grid[row][column + 1]
        ) {
          alert(`Winner: Player${player}`);
        } else if (
          grid[row][column] &&
          row + 3 < height &&
          grid[row][column] == grid[row + 3][column] &&
          grid[row][column] == grid[row + 2][column] &&
          grid[row][column] == grid[row + 1][column]
        ) {
          alert(`Winner: Player${player}`);
        } else if (
          grid[row][column] &&
          row + 3 < height &&
          column + 3 < width &&
          grid[row][column] == grid[row + 3][column + 3] &&
          grid[row][column] == grid[row + 2][column + 2] &&
          grid[row][column] == grid[row + 1][column + 1]
        ) {
          alert(`Winner: Player${player}`);
        } else if (
          grid[row][column] &&
          row - 3 > 0 &&
          column + 3 < height &&
          grid[row][column] == grid[row - 1][column + 1] &&
          grid[row][column] == grid[row - 2][column + 2] &&
          grid[row][column] == grid[row - 3][column + 3]
        ) {
          alert(`Winner: Player${player}`);
        }
      }
    }
  }, 50);
};