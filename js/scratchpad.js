

import * as concepts from "./core/concepts.js";
import { Wait } from "./rules-basic.js";

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

