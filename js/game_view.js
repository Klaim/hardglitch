// This file contains the code that knows how to represent the things in the game.
// We basically translate what's happening in the game's state to visual and audio
// stuffs here.
// We interpret events to animate the view of the world.
// The code here is just the skeleton to build over the actual representation.

import * as graphics from "./system/graphics.js";

import { assets } from "./game_assets.js";
import { Game } from "./game.js";

export { View };

class View{

    constructor(game){
        console.assert(game instanceof Game);
        this.game = game;

        ////////////////////////////////////////////////
        // TEST SETUP - COMPLETELY TEMPORARY
        this.sprite = new graphics.Sprite();
        this.tile_grid = new graphics.TileGrid();
        this.some_value = -99999.0;

        this.sprite.position.x = 200.0;
        this.sprite.position.y = 100.0;
        this.sprite.source_image = assets.images.warrior;
        //////////////////////////////////////////////
    }

    update(){
        ////////////////////////////////////////////////
        // TEST SETUP - COMPLETELY TEMPORARY
        this.some_value += 0.5;
        const some_direction = {x:Math.sin(this.some_value), y:Math.cos(this.some_value)};
        this.sprite.position = this.sprite.position.translate(some_direction);
        ////////////////////////////////////////////////
    }

    render_graphics(){
        ////////////////////////////////////////////////
        // TEST SETUP - COMPLETELY TEMPORARY
        this.tile_grid.draw();
        this.sprite.draw();
        //////////////////////////////////////////////
    }

};



