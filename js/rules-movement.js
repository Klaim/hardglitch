
import * as concepts from "./core/concepts.js";

export { MovementRules, Move, Moved }

class Moved extends concepts.Event {
    constructor(body, from_pos, to_pos) {
        super();
        this.body = body;
        this.from_pos = from_pos;
        this.to_pos = to_pos;
    }
};


class Move extends concepts.Action {

    constructor(new_position){
        console.assert(new_position);
        super();
        this.new_position = new_position;
    }

    execute(world, agent) {
        console.assert(agent.body);
        const initial_pos = agent.body.position;
        agent.body.position = this.new_position;
        return [ new Moved(agent.body, initial_pos, this.new_position) ];
    }
};


// Rule: agents with a body can move (depending on what is arround).
// Movement can be done only 1 square per turn.
class MovementRules extends concepts.Rule {

    get_actions_for(agent, world) {

        let actions = {};

        if (agent.body) {
            // TODO: check if we CAN move (or not) in each direction, add actions accordingly
            const current_pos = agent.body.position;
            console.assert(current_pos);

            actions.move_west   = new Move(current_pos.west);
            actions.move_east  = new Move(current_pos.east);
            actions.move_north     = new Move(current_pos.north);
            actions.move_south   = new Move(current_pos.south);
        }

        return actions;
    }

};
