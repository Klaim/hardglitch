import * as world from "./world.js";

export { loadImages, playerPic, tilePics };


var playerPic=document.createElement("img");
var tilePics = [];

var picsToLoad = 0;

var on_loading_done;


function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    on_loading_done();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = document.createElement("img");
  beginLoadingImage(tilePics[tileCode],fileName);
}

function loadImages(on_done_handler) {

  on_loading_done = on_done_handler;

  var imageList = [
    {varName:playerPic, theFile:"warrior.png"},

    {tileType:world.TILE_GROUND, theFile:"world_ground.png"},
    {tileType:world.TILE_WALL, theFile:"world_wall.png"},
    {tileType:world.TILE_GOAL, theFile:"world_goal.png"},
    {tileType:world.TILE_KEY, theFile:"world_key.png"},
    {tileType:world.TILE_DOOR, theFile:"world_door.png"}
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].tileType != undefined) {
      loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } // end of else
  } // end of for imageList

} // end of function loadImages


