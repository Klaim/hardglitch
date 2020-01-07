// This file describes the core concepts that exist in the game mechanics.
// This is not a modelisation of these concept, just rules of how things
// work in the game system. For example, we can say what an "object" is,
// what rules can be applied on it and what interface it should have to work
// in our system.
// Think about it this way: code here could be reused to make another similar
// game, without being changed too much.
// We will describe what kind of entities can exist here.

export {
    World,
    Action,
    Agent,
    Object,
    Rule,
};


// An action is when an Agent changes something in the world, following the
// world's rules.
class Action {

    Action(action_type){
        console.assert(action_type, "Actions must have a type!");
        this._type = action_type;
        action_type.setup(this);
    }

    // Apply the action, transform the world.
    execute(world){

    }
};

// Agents are entities that can take decitions and produce actions.
class Agent {

    action_points_left = 0;
    max_action_points = 0;

    objects = [];
    body = null; // TODO: consider handling more than one body for an agent (like a big boss?)

    is_player = false; // True if the action should be decided by a player.

    // Decides what to do for this turn, returns an Action or null for no action.
    decide_next_action(){

    }



};

// Rules are transformations and checks that apply all the time as long
// as they exist.
class Rule {
    // TODO: add on_something for each case we want to apply rules to.

    // Returns a list of actions this rule allows to the agent.
    // This will be called to get the full list of actions an agent can
    // do, including the ones related to the environment.
    get_actions_for(agent, world){

    }

};

// Objects are things that have a "physical" existence, that is it can
// be located (in space or relative to another object).
// For example a body, a pen in a bag, a software in a computer in a bag.
// However objects cannot move by themselves.
class Object {

};

// Bodies are special entities that have "physical" existence,
// like objects, but they can move by themselves.
// Most of the time they are owned by agents.
class Body { // TODO: consider inheriting from Object?

};

// This is the world as known by the game.
// It's mainly a big container of every entities that makes the world.
class World
{
    agents = [];
    objects = []; // Objects that are in the space of the world, not in other objects.
    rules = [];


    push_player_action(action){
        console.assert(action);
        this.player_action = action;
    }
};

