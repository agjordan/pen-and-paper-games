"use strict";

var gameChomp = document.getElementById("gameChomp");
var gameObstruction = document.getElementById("gameObstruction");
var gameConnect4 = document.getElementById("gameConnect4");

var playChomp = function playChomp() {
  gameChomp.classList.remove("hidden");
  gameObstruction.className = "game hidden";
  gameConnect4.className = "game hidden";
};

var playObstruction = function playObstruction() {
  gameObstruction.classList.remove("hidden");
  gameChomp.className = "game hidden";
  gameConnect4.className = "game hidden";
};

var playConnect4 = function playConnect4() {
  gameConnect4.classList.remove("hidden");
  gameChomp.className = "game hidden";
  gameObstruction.className = "game hidden";
};