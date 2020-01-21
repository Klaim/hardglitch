import * as graphics from "../system/graphics.js";
import * as debug from "../debug.js";
import * as world from "./world.js";

export { warriorClass }

// tuning constants
const PLAYER_MOVE_SPEED = 4.0;


function warriorClass() {
  // variables to keep track of position
  this.x = 75;
  this.y = 75;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;

  // key controls used for this
  this.setupControls = function(northKey,eastKey,southKey,westKey) {
    this.controlKeyForNorth = northKey;
    this.controlKeyForEast = eastKey;
    this.controlKeyForSouth = southKey;
    this.controlKeyForWest = westKey;
  }

  this.init = function(whichGraphic,whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.reset();
  }

  this.reset = function() {
    this.keysHeld = 0;
    if(this.homeX == undefined) {
      for(var i=0; i<world.roomGrid.length; i++) {
        if( world.roomGrid[i] == world.TILE_PLAYER) {
          var tileRow = Math.floor(i/world.ROOM_COLS);
          var tileCol = i%world.ROOM_COLS;
          this.homeX = tileCol * world.TILE_W + 0.5 * world.TILE_W;
          this.homeY = tileRow * world.TILE_H + 0.5 * world.TILE_H;
          world.roomGrid[i] = world.TILE_GROUND;
          break; // found it, so no need to keep searching
        } // end of if
      } // end of for
    } // end of if position not saved yet

    this.x = this.homeX;
    this.y = this.homeY;

  } // end of reset

  this.move = function() {
    var nextX = this.x;
    var nextY = this.y;
    var moveBorderX = nextX;
    var moveBorderY = nextY;

    if(this.keyHeld_North) {
      nextY -= PLAYER_MOVE_SPEED;
      moveBorderY = nextY - world.HALF_TILE_H;
    }
    if(this.keyHeld_East) {
      nextX += PLAYER_MOVE_SPEED;
      moveBorderX = nextX + world.HALF_TILE_W;
    }
    if(this.keyHeld_South) {
      nextY += PLAYER_MOVE_SPEED;
      moveBorderY = nextY + world.HALF_TILE_H;
    }
    if(this.keyHeld_West) {
      nextX -= PLAYER_MOVE_SPEED;
      moveBorderX = nextX - world.HALF_TILE_W;
    }

    var walkIntoTileIndex = world.getTileIndexAtPixelCoord(moveBorderX,moveBorderY);
    var walkIntoTileType = world.TILE_WALL;

    if( walkIntoTileIndex != undefined) {
      walkIntoTileType = world.roomGrid[walkIntoTileIndex];
    }

    switch( walkIntoTileType ) {
      case world.TILE_GROUND:
        this.x = nextX;
        this.y = nextY;
        break;
      case world.TILE_GOAL:
        debug.setText(this.myName + " won");
        this.reset();
        break;
      case world.TILE_DOOR:
        if(this.keysHeld > 0) {
          this.keysHeld--; // one less key
          debug.setText("Keys: "+this.keysHeld);

          world.roomGrid[walkIntoTileIndex] = world.TILE_GROUND; // remove door
        }
        break;
      case world.TILE_KEY:
        this.keysHeld++; // gain key
        debug.setText("Keys: "+this.keysHeld);

        world.roomGrid[walkIntoTileIndex] = world.TILE_GROUND; // remove key
        break;
      case world.TILE_WALL:
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
  }

  this.draw = function() {
    graphics.drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0.0 );
  }

} // end of class