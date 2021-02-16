//playing area
const GRID_HEIGHT = 4;
const GRID_WIDTH = 5;

const PLAYERS = 2;
let currentPlayer = 1;
let playerColor = ["blue", "red"];

const game = document.getElementById("game");

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.clicked = "";
    this.claimed = "";
  }
}

const generateGrid = (height, width) => {
  let grid = [];
  for (let i = 0; i < height; i++) {
    grid[i] = [];
    for (let j = 0; j < width; j++) {
      grid[i].push(new Cell(i, j));
    }
  }
  grid[0][0].clicked = "X";
  grid[0][0].claimed = "X";
  return grid;
};

let grid = generateGrid(GRID_HEIGHT, GRID_WIDTH);

const updateDisplay = () => {
  let display = "";
  for (i in grid) {
    display += `<div class="row row${i}">`;
    for (j in grid[i]) {
      switch (grid[i][j].claimed) {
        case "X":
          display += `<wired-card fill='green' class="cell ${i},${j}"></wired-card>`;
          break;
        case "":
          display += `<wired-card class="cell ${i},${j}"></wired-card>`;
          break;
        default:
          display += `<wired-card fill="${playerColor[grid[i][j].claimed - 1]}" class="cell ${i},${j}">${grid[i][j].clicked}</wired-card>`;
          break;
      }
    }
    display += "</div>";
  }
  game.innerHTML = display;
};

const markCells = (x, y) => {
  if (grid[x][y].claimed) return;
  grid[x][y].clicked = currentPlayer;
  for (i in grid) {
    if (i < x) continue;
    for (j in grid[i]) {
      if (j < y) continue;
      if (grid[i][j].claimed == "") {
        grid[i][j].claimed = currentPlayer;
      }
    }
  }
  checkWinCondition();
  updateDisplay();
  nextPlayer();
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
    for (i in grid) {
      for (j in grid[i]) {
        if (grid[i][j].claimed == "") {
          return;
        }
      }
    }
    nextPlayer();
    alert(`Player${currentPlayer} wins!`);
  }, 50);
};

const clearGrid = () => {
  document.getElementById("startGame").innerText = "Reset";
  grid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
  updateDisplay();
};

game.addEventListener("click", (event) => {
  let xAndY = event.target.classList[1].split(",");
  let x = xAndY[0];
  let y = xAndY[1];
  markCells(x, y);
});
