// This file contains the main loop and initialization code for this game.


// save the canvas for dimensions, and its 2d context for drawing to it
import * as graphics from "./system/graphics.js";
import { Transform } from "./system/spatial.js";
import { execute_turns_until_players_turn } from "./core/action-turn.js";
import * as concepts from "./core/concepts.js";
import * as assets from "./assets.js";

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

var game_assets = { // Each path in this object will be replaced by an actual asset.
  images : { // group "images"
    asset_loader : assets.image_loader, // This is the function that will be used to convert the following data into usable objects.
    warrior: "./images/warrior.png",
    door : "./images/world_door.png",
    goal : "./images/world_goal.png",
    ground : "./images/world_ground.png",
    key : "./images/world_key.png",
    wall : "./images/world_wall.png"
  }
};

let sprite = new graphics.Sprite();
let tile_grid = new graphics.TileGrid();
let some_value = -99999.0;

function test_init(){
  sprite.position.x = 200.0;
  sprite.position.y = 100.0;
  sprite.source_image = game_assets.images.warrior;
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

window.onload = async function() {
  graphics.initialize();
  game_assets = await assets.load_assets(game_assets);
  console.log(`ASSETS: ${JSON.stringify(game_assets)}`);
  test_init();
  start();
}
