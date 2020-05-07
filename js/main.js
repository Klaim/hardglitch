// This file contains the main loop and initialization code for this game.


// save the canvas for dimensions, and its 2d context for drawing to it
import * as graphics from "./system/graphics.js";
import * as game_assets from "./game_assets.js";
import { Game } from "./game.js";
import { View } from "./game_view.js";

let current_game = null;
let current_view = null;

function start() {
  // these next few lines set up our game logic and render cycle.
  var framesPerSecond = 60;
  setInterval(function() {
      updateEverything();
      drawEverything();
    }, 1000/framesPerSecond);

  console.log("GAME READY - STARTED");
}

window.onload = async function() {
  graphics.initialize();
  await game_assets.load_all_assets();

  current_game = new Game();
  current_view = new View(current_game);

  start();
}

function updateEverything() {
  current_view.update();
}


function drawEverything() {
  graphics.clear();
  current_view.render();
}
