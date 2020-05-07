// This files provie the abstract representation of a game
// and how it is setup by default.

import * as concepts from "./core/concepts.js";
import * as turns from "./core/action-turn.js";

export { Game }


// Abstract but complete representation of a game.
// Create this object for each new game.
// Make it visible using a GameView.
class Game {
    last_turn_info = null;

    constructor(world){
        this.world = world ? world : new concepts.World();
        this.__turn_sequence = turns.execute_turns_until_players_turn(this.world);
    }

    update_until_player_turn() {
        last_turn_info = this.__turn_sequence.next().value;
        return last_turn_info;
    }

};

