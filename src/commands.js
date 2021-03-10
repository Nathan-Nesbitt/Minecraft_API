/**
 * Written by Nathan Nesbitt, Copyright 2020.
 * 
 * These are direct implementations of the specific in game commands to allow
 * for easier user implementation. 
 */

import {Command} from './command.js';

class Move extends Command {
    constructor(minecraft_api_connection, args, func = null) {
        super(minecraft_api_connection, "Move", args, func);
    }
}

class Teleport extends Command {
    constructor(minecraft_api_connection, args, func = null) {
        super(minecraft_api_connection, "Teleport", args, func);
    }
}

class Turn extends Command {
    constructor(minecraft_api_connection, args, func = null) {
        super(minecraft_api_connection, "Turn", args, func);
    }
}

class Say extends Command {
    constructor(minecraft_api_connection, args, func = null) {
        super(minecraft_api_connection, "Say", args, func);
    }
}

class Give extends Command {
    constructor(minecraft_api_connection, args, func = null) {
        super(minecraft_api_connection, "Give", args, func);
    }
}

class Place extends Command {
    constructor(minecraft_api_connection, args, func = null) {
        super(minecraft_api_connection, "Place", args, func);
    }
}

export {
    Move,
    Teleport,
    Turn,
    Say,
    Give,
    Place
}