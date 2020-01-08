// This file contains the action system and how actions are "solved".
//

export { execute_turns_until_players_turn, PlayerTurn };

import * as concept from "./concepts.js";
import { rotate_array } from "../system/utility.js";

// Data needed for the player (or the "view" part of the game code) to:
// - know what happened since last player turn;
// - know what that player agent can and cannot do for this turn;
class PlayerTurn
{
    constructor(world, events, player_agent, possible_actions){
        this.world = world;                         // The world we need an action for.
        this.events = events;                       // Passed events since last time we needed a player action.
        this.player_agent = player_agent;           // Agent that represent the player for this turn.
        this.possible_actions = possible_actions;   // Actions that the player could take.
    }
};

// Returns a generator of sequence of events (produced through the turns of the different agents).
//
function* execute_turns_until_players_turn(world) {
    console.assert(world instanceof concept.World);

    let looping_agent_sequence = loop_all_agents();
    let events = []; // TODO: format of events

    for(let agent in looping_agent_sequence){
        console.assert(agent instanceof concept.Agent);

        let possible_actions = world.gather_possible_actions_from_rules(agent);
        let action = agent.decide_next_action(possible_actions);

        if(!action){ // No decision taken? Only players can hesitate!!!!
            // This is a player: let the player decide what to do (they will store the action in the world state).
            yield new PlayerTurn(world, events, agent, possible_actions); // Give back the control and the list of events done since last turn.
            events = []; // Start a new sequence of events until we reach next player turn.
            action = world.player_action; // Extract the player action from the world state.
        }

        // Apply the selected action.
        let action_events = action.execute(world, agent);
        events.push(...action_events);

        // Update the world according to it's rules.
        let rules_events = world.apply_rules();
        events.push(...rules_events);
    }
}

function *loop_all_agents(world){
    console.assert(world instanceof concept.World);
    while(world.agents.length > 0){
        yield world.agents[0];
        rotate_array(world.agents);
    }
}



