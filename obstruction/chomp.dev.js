"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//playing area
var GRID_HEIGHT = 6;
var GRID_WIDTH = 6;
var PLAYERS = 2;
var currentPlayer = 1;
var playerColor = ["blue", "red"];
var game = document.getElementById("game");

var Cell = function Cell(x, y) {
  _classCallCheck(this, Cell);

  this.x = x;
  this.y = y;
  this.clicked = "";
  this.claimed = "";
};

var generateGrid = function generateGrid(height, width) {
  var grid = [];

  for (var _i = 0; _i < height; _i++) {
    grid[_i] = [];

    for (var _j = 0; _j < width; _j++) {
      grid[_i].push(new Cell(_i, _j));
    }
  }

  return grid;
};

var grid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
var gameinfo = document.getElementById("gameinfo");

var updateDisplay = function updateDisplay() {
  var display = "";

  for (i in grid) {
    display += "<div class=\"row row".concat(i, "\">");

    for (j in grid[i]) {
      switch (grid[i][j].claimed) {
        ///needs to be reworked
        case "X":
          display += "<wired-card fill='grey' class=\"cell ".concat(i, ",").concat(j, "\">").concat(grid[i][j].clicked, "</wired-card>");
          break;

        case "":
          display += "<wired-card class=\"cell ".concat(i, ",").concat(j, "\">").concat(grid[i][j].clicked, "</wired-card>");
          break;

        default:
          display += "<wired-card fill=\"".concat(playerColor[grid[i][j].claimed - 1], "\" class=\"cell ").concat(i, ",").concat(j, "\">").concat(grid[i][j].clicked, "</wired-card>");
          break;
      }
    }

    display += "</div>";
  }

  game.innerHTML = display;
};

var markCells = function markCells(x, y) {
  if (grid[x][y].clicked || grid[x][y].claimed) return;

  for (var _i2 = -1; _i2 <= 1; _i2++) {
    if (x + _i2 < 0 || x + _i2 >= GRID_WIDTH) continue;

    for (var _j2 = -1; _j2 <= 1; _j2++) {
      if (y + _j2 < 0 || y + _j2 >= GRID_HEIGHT) continue;
      console.log(x + _i2, y + _j2);
      grid[x + _i2][y + _j2].claimed = "X";
    }
  }

  grid[x][y].claimed = currentPlayer;
  grid[x][y].clicked = currentPlayer;
  checkWinCondition();
  updateDisplay();
  nextPlayer();
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
    for (i in grid) {
      for (j in grid[i]) {
        if (grid[i][j].claimed == "") {
          return;
        }
      }
    }

    nextPlayer();
    alert("Player".concat(currentPlayer, " wins!"));
  }, 50);
};

var clearGrid = function clearGrid() {
  document.getElementById("startGame").innerText = "Reset";
  grid = generateGrid(GRID_HEIGHT, GRID_WIDTH);
  updateDisplay();
};

game.addEventListener("click", function (event) {
  var xAndY = event.target.classList[1].split(",");
  var x = Number(xAndY[0]);
  var y = Number(xAndY[1]);
  markCells(x, y);
});