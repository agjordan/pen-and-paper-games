//playing area
const GRID_HEIGHT = 6;
const GRID_WIDTH = 6;

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
  return grid;
};

let grid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
let gameinfo = document.getElementById("gameinfo")

const updateDisplay = () => {
  let display = "";
  for (i in grid) {
    display += `<div class="row row${i}">`;
    for (j in grid[i]) {
      switch (grid[i][j].claimed) {
        ///needs to be reworked
        case "X":
          display += `<wired-card fill='grey' class="cell ${i},${j}">${grid[i][j].clicked}</wired-card>`;
          break;
        case "":
          display += `<wired-card class="cell ${i},${j}">${grid[i][j].clicked}</wired-card>`;
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
  if (grid[x][y].clicked || grid[x][y].claimed) return;
  for (let i = -1; i <= 1; i++) {
    if (x + i < 0 || x + i >= GRID_WIDTH) continue;
    for (let j = -1; j <= 1; j++) {
      if (y + j < 0 || y + j >= GRID_HEIGHT) continue;
        console.log(x+i, y+j)
        grid[x+i][y+j].claimed = "X"
      }
    }
    grid[x][y].claimed = currentPlayer;
    grid[x][y].clicked = currentPlayer;
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
  let x = Number(xAndY[0]);
  let y = Number(xAndY[1]);
  markCells(x, y);
});
