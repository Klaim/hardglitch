// save the canvas for dimensions, and its 2d context for drawing to it
import * as graphics from "./system/graphics.js";
import { initInput } from "./system/input.js";
import * as resources from "./resources.js";
import * as world from "./world.js";
import { warriorClass } from "./warrior.js";

var p1 = new warriorClass();


function start() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);

  p1.init(resources.playerPic, "Blue");
  initInput(p1);
  console.log("GAME READY");
}

function moveEverything() {
  p1.move();
}

function drawEverything() {
  world.drawRoom();

  p1.draw();
}

window.onload = function() {
  graphics.initialize();
  resources.loadImages(start);
}
