// This files provie the abstract representation of a game
// and how it is setup by default.

import * as concepts from "./core/concepts.js";
import * as turns from "./core/action-turn.js";

export { Game }


// Abstract but complete representation of a game.
// Create this object for each new game.
// Make it visible using a GameView.
//
// TODO: make this serializable, to allow saving it?
class Game {
    turn_count = 0;
    world = new concepts.World();
    last_turn_info = null;
    __turn_sequence = turns.execute_turns_until_players_turn(this.world);

    constructor(){

    }

    update() {
        ++turn_count;
        last_turn_info = this.__turn_sequence.next().value;
        return last_turn_info;
    }

};

