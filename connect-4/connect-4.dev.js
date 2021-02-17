"use strict";

//playing area
var GRID_HEIGHT = 6;
var GRID_WIDTH = 7;
var PLAYERS = 2;
var currentPlayer = 1;
var playerColor = ["blue", "red"];
var game = document.getElementById("game");

var generateGrid = function generateGrid(height, width) {
  var grid = [];

  for (var i = 0; i < height; i++) {
    grid[i] = [];

    for (var j = 0; j < width; j++) {
      grid[i].push("");
    }
  }

  return grid;
};

var grid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
var gameinfo = document.getElementById("gameinfo");

var updateDisplay = function updateDisplay() {
  var display = "";

  for (row in grid) {
    display += "<div class=\"row row".concat(row, "\">");

    for (column in grid[row]) {
      switch (grid[row][column]) {
        case "":
          display += "<wired-card class=\"cell ".concat(row, ",").concat(column, "\"></wired-card>");
          break;

        default:
          display += "<wired-card fill=\"".concat(playerColor[grid[row][column] - 1], "\" class=\"cell ").concat(row, ",").concat(column, " round\">").concat(grid[row][column], "</wired-card>");
          break;
      }
    }

    display += "</div>";
  }

  game.innerHTML = display;
};

var markCells = function markCells(column) {
  for (var _row = GRID_HEIGHT - 1; _row >= 0; _row--) {
    if (grid[_row][column]) continue;
    grid[_row][column] = currentPlayer;
    updateDisplay();
    checkWinCondition();
    nextPlayer();
    break;
  }
};

var nextPlayer = function nextPlayer() {
  if (currentPlayer === PLAYERS) {
    currentPlayer = 1;
  } else {
    currentPlayer++;
  }
};

var checkWinCondition = function checkWinCondition() {
  setTimeout(function () {
    for (var _row2 = 0; _row2 < GRID_HEIGHT; _row2++) {
      for (var _column = 0; _column < GRID_WIDTH; _column++) {
        if (grid[_row2][_column] && _column + 3 < GRID_WIDTH && grid[_row2][_column] == grid[_row2][_column + 3] && grid[_row2][_column] == grid[_row2][_column + 2] && grid[_row2][_column] == grid[_row2][_column + 1]) {
          nextPlayer();
          alert("Winner: Player".concat(currentPlayer));
        } else if (grid[_row2][_column] && _row2 + 3 < GRID_HEIGHT && grid[_row2][_column] == grid[_row2 + 3][_column] && grid[_row2][_column] == grid[_row2 + 2][_column] && grid[_row2][_column] == grid[_row2 + 1][_column]) {
          nextPlayer();
          alert("Winner: Player".concat(currentPlayer));
        } else if (grid[_row2][_column] && _row2 + 3 < GRID_WIDTH && _column + 3 < GRID_HEIGHT && grid[_row2][_column] == grid[_row2 + 3][_column + 3] && grid[_row2][_column] == grid[_row2 + 2][_column + 2] && grid[_row2][_column] == grid[_row2 + 1][_column + 1]) {
          nextPlayer();
          alert("Winner: Player".concat(currentPlayer));
        } else if (grid[_row2][_column] && _row2 + 3 < GRID_WIDTH && _column - 3 > 0 && grid[_row2][_column] == grid[_row2 + 3][_column - 3] && grid[_row2][_column] == grid[_row2 + 2][_column - 2] && grid[_row2][_column] == grid[_row2 + 1][_column - 1]) {
          nextPlayer();
          alert("Winner: Player".concat(currentPlayer));
        }
      }
    }
  }, 50);
};

var clearGrid = function clearGrid() {
  document.getElementById("startGame").innerText = "Reset";
  grid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
  updateDisplay();
};

game.addEventListener("click", function (event) {
  var column = event.target.classList[1].split(",")[1];
  markCells(column);
});