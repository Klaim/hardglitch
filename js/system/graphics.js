// This file contains the graphic system implementation.
// It provides utilities to display anything graphic.


export {
  initialize,
  Sprite,
};

import * as spatial from "./spatial.js"

var canvas, canvasContext;

class Sprite {
  transform = new spatial.Transform();
  size = new spatial.Rectangle();
  source_image = null; // If null, draw a colored rectangle
  source_transform = new spatial.Transform(); // not sure we'll need this one in the end
  source_size = new spatial.Rectangle();

  constructor(image=null, transform=new spatial.Transform()){
    this.source_image = image;
    this.transform = transform;
  }

  draw(){ // TODO: take a camera into account
    // TODO: complete by using all the sprite info
    canvasContext.save();
    canvasContext.translate(this.transform.posittion.x, this.transform.posittion.y);
    canvasContext.rotate(this.transform.orientation.degrees); // TODO: check if t's radian or degrees
    if(this.source_image){
      // canvasContext.drawImage(this.source_image,this.size.width,this.size.height);
      canvasContext.drawImage(this.source_image, this.source_image.width, this.source_image.height); // TODO: replace by specified size
    } else {
      // We don't have an image so we draw a colored rectangle instead.
      const empty_sprite_color = "0x000000"; // TODO: use a proper color, maybe fushia
      colorRect(this.size.top_left.x, this.size.top_left.y,
        this.size.bottom_right.x, this.size.bottom_right.y,
        empty_sprite_color);
    }
    canvasContext.restore();
  }
};

function initialize(){
  if(canvasContext || canvas)
    throw "Graphic system already initialized.";

  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  canvasContext.restore(); // undo the translation movement and rotation since save()
}

