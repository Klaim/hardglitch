// This file contains the action system and how actions are "solved".
//

export { execute_turns_until_players_turn };

import * as concept from "./concepts.js";
import { rotate_array } from "../system/utility.js";


// Returns a generator of sequence of events (produced through the turns of the different agents).
//
function* execute_turns_until_players_turn(world) {
    console.assert(typeof world === concept.world);

    let looping_agent_sequence = loop_all_agents();
    let events = [];

    for(let agent in looping_agent_sequence){
        console.assert(typeof agent === concept.Agent);

        let action = agent.decide_next_action();
        if(!action){ // No decision taken? Only players can hesitate!!!!
            // This is a player: let the player decide what to do (they will store the action in the world state).
            yield events; // Give back the control and the list of events done since last turn.
            events = []; // Start a new sequence of events until we reach next player turn.
            action = world.player_action; // Extract the player action from the world state.
        }

        // TODO: apply rules
        // TODO: apply the action

    }
}

function *loop_all_agents(world){
    console.assert(typeof world === concept.world);
    while(length(world.agents) > 0){
        yield world.agents[0];
        rotate_array(world.agents);
    }
}
