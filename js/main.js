// This file contains the main loop and initialization code for this game.


// save the canvas for dimensions, and its 2d context for drawing to it
import * as graphics from "./system/graphics.js";
import { initInput } from "./system/input.js";
import * as resources from "./resources.js";
import * as world from "./world.js";
import { warriorClass } from "./warrior.js";
import { execute_turns_until_players_turn } from "./core/action-turn.js";
import * as concepts from "./core/concepts.js";

var p1 = new warriorClass();

let world = new concepts.World();
let turn_sequence = execute_turns_until_players_turn(world);

class Player extends concepts.Agent {
};

class Moved extends concepts.Event {
  constructor(body){
    this.body = body;
    super("");
  }
};

class Waited extends concepts.Event {};

class MoveRight extends concepts.Action {
  execute(world, agent){
    console.assert(agent.body);
    agent.body.x = agent.body.x + 10;
    return [ new Moved( agent.body ) ];
  }
};




function start() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);

  p1.init(resources.playerPic, "Blue");
  initInput(p1);
  console.log("GAME READY - STARTED");
}

function moveEverything() {
  // p1.move();
}

function drawEverything() {
  world.drawRoom();

  p1.draw();
}

window.onload = function() {
  graphics.initialize();
  resources.loadImages(start);
}
