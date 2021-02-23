import {Cell} from '../cell.model.js'

//playing area
const GRID_HEIGHT = 6;
const GRID_WIDTH = 6;

const PLAYERS = 2;
let currentPlayer = 1;
let playerColor = ["blue", "red"];

const GAME_ELEM = document.getElementById("game");

//most of the game logic is handled here:
document.addEventListener('DOMContentLoaded', function () {
  console.log('loaded')
  //any interaction with the game grid
  GAME_ELEM.addEventListener("click", (event) => {
    console.log('clicked')
    let xAndY = event.target.classList[1].split(",");
    let x = Number(xAndY[0]);
    let y = Number(xAndY[1]);
    markCells(gameGrid, x, y, currentPlayer);
    checkWinCondition(gameGrid, currentPlayer);
    updateDisplay(gameGrid, GAME_ELEM);
    currentPlayer = getNextPlayer(currentPlayer, PLAYERS);
  });
  //reset button
  document.getElementById("startGame").addEventListener('click', (event) => {
    console.log('clicked registered')
    event.target.innerText = "Reset";
    gameGrid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
    updateDisplay(gameGrid, GAME_ELEM);
  })
});

export const generateGrid = (height, width) => {
  let grid = [];
  for (let i = 0; i < height; i++) {
    grid[i] = [];
    for (let j = 0; j < width; j++) {
      grid[i].push(new Cell());
    }
  }
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
          display += `<wired-card fill='lightgrey' class="cell ${i},${j}">${grid[i][j].clicked}</wired-card>`;
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
  elem.innerHTML = display;
};

export const markCells = (grid, x, y, player) => {
  let width = grid[0].length
  let height = grid.length
  if (grid[x][y].clicked || grid[x][y].claimed) return;
  for (let i = -1; i <= 1; i++) {
    if (x + i < 0 || x + i >= width) continue;
    for (let j = -1; j <= 1; j++) {
      if (y + j < 0 || y + j >= height) continue;
        grid[x+i][y+j].claimed = "X"
      }
    }
    grid[x][y].claimed = player;
    grid[x][y].clicked = player;
};

export const getNextPlayer = (current, total) => {
  if (current === total) {
    return current = 1;
  } else {
    return ++current;
  }
};

const checkWinCondition = (grid, player) => {
  setTimeout(function () {
    for (let row in grid) {
      for (let column in grid[row]) {
        if (grid[row][column].claimed == "") {
          return;
        }
      }
    }
    alert(`Player${player} wins!`);
  }, 50);
};