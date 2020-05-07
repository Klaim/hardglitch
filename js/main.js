// This file contains the main loop and initialization code for this game.


// save the canvas for dimensions, and its 2d context for drawing to it
import * as graphics from "./system/graphics.js";
import * as game_assets from "./game_assets.js";
import { Game } from "./game.js";
import { View } from "./game_view.js";

let current_game = null;
let current_view = null;

window.onload = async function() {
  graphics.initialize();
  await game_assets.load_all_assets();

  new_game(); // TODO : call this function only once we start a new game.

  start();
}

function start() {
  // these next few lines set up our game logic and render cycle.
  var framesPerSecond = 60;
  setInterval(function() {
      update_everything();
      draw_everything();
    }, 1000/framesPerSecond);

  console.log("GAME READY - STARTED");
}

function update_everything() {
  current_view.update();
}

function draw_everything() {
  graphics.clear();
  current_view.render_graphics();
}

function new_game() {
  current_game = new Game();
  current_view = new View(current_game);
}
