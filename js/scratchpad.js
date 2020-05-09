// This is where Klaim test some ideas.

export { make_test_world, next_update };

import { current_game } from "./main.js";
import * as concepts from "./core/concepts.js";
import { Wait, BasicRules } from "./rules-basic.js";
import { MovementRules } from "./rules-movement.js";
import {random_sample} from "./system/utility.js";

class SomeAI extends concepts.Agent {

    decide_next_action(possible_actions) {
        // Just picking a random action is a perfectly valid strategy, lol
        let random_action = random_sample(Object.values(possible_actions));
        if(random_action == null) { // no action found.
            // In this case just wait:
            return new Wait();
        }
        return random_action;
    }
};

class Enemy extends SomeAI {
    constructor(body){
        super();
        this.body = body;
    }
};

class PlayerBody extends concepts.Body {
    constructor(){
        super();
    }
}

function make_test_world(){
    const world = new concepts.World();

    world.add( new BasicRules() );
    world.add( new MovementRules() );

    const player = new concepts.Player();
    player.body = new PlayerBody();

    const enemy_body = new concepts.Body();
    const enemy =  new Enemy(enemy_body);
    enemy_body.position.x = 3;

    world.add(player);
    world.add(player.body);
    world.add(enemy);
    world.add(enemy_body);

    return world;
}

function next_update(){
    const player_action = new Wait();
    current_game.update_until_player_turn(player_action);
}

// entity = {          // every field is optional
//     id : {},        // id that will be associated to the components
//     graphics : {},  // component, name is type
//     audio : {},     // component, name is type
//     actor : {},     // component, name is type
//     body : {},      // component, name is type

// }

// system = {
//     required_components : ["graphics", "audio"],
//     update : function(world, graphics, audio){   }
// }

// ecs

// function apply_system()

// function update(ecs){

// }