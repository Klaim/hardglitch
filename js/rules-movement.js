
import * as concepts from "./core/concepts.js";

export { MovementRules, Move, Moved }

class Moved extends concepts.Event {
    constructor(body, from_pos, to_pos) {
        this.body = body;
        this.from_pos = from_pos;
        this.to_pos = to_pos;
    }
};


class Move extends concepts.Action {

    constructor(new_position){
        this.new_position;
    }

    execute(world, agent) {
        console.assert(agent.body);
        let initial_pos = agent.body.position;
        agent.body.position = new_position;
        return [ new Moved(agent.body, initial_pos, new_position) ];
    }
};


// Rule: agents with a body can move (depending on what is arround).
// Movement can be done only 1 square per turn.
class MovementRules extends concepts.Rule {

    get_actions_for(agent, world) {

        let actions = {};

        if (agent.body) {
            // TODO: check if we CAN move (or not) in each direction, add actions accordingly
            let current_pos = agent.body.position;
            console.assert(current_pos);

            actions.move_left   = new Move(current_pos.left);
            actions.move_right  = new Move(current_pos.right);
            actions.move_up     = new Move(current_pos.up);
            actions.move_down   = new Move(current_pos.down);
        }

        return actions;
    }

};
