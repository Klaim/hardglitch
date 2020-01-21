// This file contains the main loop and initialization code for this game.


// save the canvas for dimensions, and its 2d context for drawing to it
import * as graphics from "./system/graphics.js";
import { Transform } from "./system/spatial.js";
//import { execute_turns_until_players_turn } from "./core/action-turn.js";
//import * as concepts from "./core/concepts.js";

//let world = new concepts.World();
//let turn_sequence = execute_turns_until_players_turn(world);


function start() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 60;
  setInterval(function() {
      updateEverything();
      drawEverything();
    }, 1000/framesPerSecond);

  console.log("GAME READY - STARTED");
}

let sprite = new graphics.Sprite();
sprite.position.x = 200.0;
sprite.position.y = 100.0;

let some_value = -99999.0;

function updateEverything() {
  some_value += 0.01;
  const some_direction = {x:Math.sin(some_value), y:Math.cos(some_value)};
  sprite.position = sprite.position.translate(some_direction);
}


function drawEverything() {
  graphics.clear();
  sprite.draw();
}

window.onload = function() {
  graphics.initialize();
  start();
}
