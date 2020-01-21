// This file contains the main loop and initialization code for this game.


// save the canvas for dimensions, and its 2d context for drawing to it
import * as graphics from "./system/graphics.js";
import { execute_turns_until_players_turn } from "./core/action-turn.js";
import * as concepts from "./core/concepts.js";

let world = new concepts.World();
let turn_sequence = execute_turns_until_players_turn(world);


function start() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      updateEverything();
      drawEverything();
    }, 1000/framesPerSecond);

  console.log("GAME READY - STARTED");
}

let sprite = new graphics.Sprite();

function updateEverything() {
  const some_direction = {x:1.0, y:0.5};
  sprite.transform.position.translate(some_direction);
}


function drawEverything() {
  sprite.draw();
}

window.onload = function() {
  graphics.initialize();
}
