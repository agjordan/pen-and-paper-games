import {Cell} from'../cell.model.js'

const GRID_HEIGHT = 4;
const GRID_WIDTH = 5;

const PLAYERS = 2;
const GAME_ELEM = document.getElementById("game");
let playerColor = ["blue", "red"]

let currentPlayer = 1;

document.addEventListener('DOMContentLoaded', function () {
  GAME_ELEM.addEventListener("click", (event) => {
    let xAndY = event.target.classList[1].split(",");
    let x = xAndY[0];
    let y = xAndY[1];
    if (gameGrid[x][y].claimed) return
    markCells(gameGrid, currentPlayer, x, y);
    updateDisplay(gameGrid, GAME_ELEM);
    checkWinCondition(gameGrid, currentPlayer);
    currentPlayer = nextPlayer(currentPlayer, PLAYERS);
  });

  document.getElementById("startGame").addEventListener('click', () => {
    document.getElementById("startGame").innerText = "Reset";
    gameGrid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
    updateDisplay(gameGrid, GAME_ELEM);
  })
});


export const generateGrid = (rows, columns) => {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < columns; j++) {
      grid[i].push(new Cell());
    }
  }
  grid[0][0].clicked = "X";
  grid[0][0].claimed = "X";
  return grid;
};

let gameGrid = generateGrid(GRID_HEIGHT, GRID_WIDTH);


export const updateDisplay = (grid, elem) => {
  let display = "";
  for (let i in grid) {
    display += `<div class="row row${i}">`;
    for (let j in grid[i]) {
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
  elem.innerHTML = display;
};

export const markCells = (grid, player, x, y) => {
  if (grid[x][y].claimed) return;
  grid[x][y].clicked = player;
  for (let i in grid) {
    if (i < x) continue;
    for (let j in grid[i]) {
      if (j < y) continue;
      if (grid[i][j].claimed == "") {
        grid[i][j].claimed = player;
      }
    }
  }
};

export const nextPlayer = (current, total) => {
  if (current === total) {
    return current = 1;
  } else {
    return ++current;
  }
};

export const checkWinCondition = (grid, player) => {
  setTimeout(function () {
    for (let i in grid) {
      for (let j in grid[i]) {
        if (grid[i][j].claimed == "") {
          return;
        }
      }
    }
    alert(`Player${player} wins!`);
  }, 50);
};

