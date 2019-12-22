// save the canvas for dimensions, and its 2d context for drawing to it
import * as graphics from "./GraphicsCommon.js";
import * as images from "./ImageLoading.js";
import * as world from "./World.js";
import { initInput } from "./Input.js";
import { warriorClass } from "./Warrior.js";

var p1 = new warriorClass();


function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  
  p1.init(images.playerPic, "Blue");
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
  images.loadImages(loadingDoneSoStartGame);
}
