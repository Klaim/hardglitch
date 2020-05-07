// This file contains the main loop and initialization code for this game.


// save the canvas for dimensions, and its 2d context for drawing to it
import * as graphics from "./system/graphics.js";
import { Transform } from "./system/spatial.js";
import { execute_turns_until_players_turn } from "./core/action-turn.js";
import * as concepts from "./core/concepts.js";
import * as game_assets from "./game_assets.js";

let world = new concepts.World();
let turn_sequence = execute_turns_until_players_turn(world);


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
  test_init();
  start();
}


let sprite = new graphics.Sprite();
let tile_grid = new graphics.TileGrid();
let some_value = -99999.0;

function test_init(){
  sprite.position.x = 200.0;
  sprite.position.y = 100.0;
  sprite.source_image = game_assets.assets.images.warrior;
}

function updateEverything() {
  some_value += 0.01;
  const some_direction = {x:Math.sin(some_value), y:Math.cos(some_value)};
  sprite.position = sprite.position.translate(some_direction);
}


function drawEverything() {
  graphics.clear();
  tile_grid.draw();
  sprite.draw();
}
