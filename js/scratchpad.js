// This is where Klaim test some ideas.

export { SomeAI };

import * as concepts from "./core/concepts.js";
import { Wait, BasicRules } from "./rules-basic.js";
import { MovementRules } from "./rules-movement.js";

class SomeAI extends concepts.Agent {
    decide_next_action(possible_actions) {
        // Just picking a random action is a perfectly valid strategy, lol
        let random_action = random_sample(Object.values(possible_actions));
        if(!random_action) { // no action found.
            // In this case just wait:
            return new Wait(this);
        }
        return random_action;
    }
};

class Ennemy extends SomeAI {
};

function make_test_world(){
    let world = new concepts.World();

    world.add_rule( new BasicRules() );
    world.add_rule( new MovementRules() );


    return world;
}


entity = {          // every field is optional
    id : {},        // id that will be associated to the components
    graphics : {},  // component, name is type
    audio : {},     // component, name is type
    actor : {},     // component, name is type
    body : {},      // component, name is type

}

system = {
    required_components : ["graphics", "audio"],
    update : function(world, graphics, audio){   }
}

ecs

function apply_system()

function update(ecs){

}