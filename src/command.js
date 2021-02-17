/**
 * Command object. Can be used in the MinecraftAPIClient to run code 
 * in minecraft education.
 */

import {Message} from './message.js';

class Command extends Message {

    /**
     * 
     * Creates a Command object, which can be sent to minecraft education to
     * manipulate the game. 
     * 
     * @param {String} command - Command to be run on server 
     * @param {String[]} args - Array of arguments for the command
     * @param {Function} func - Callback function on success (default null)
     */
    constructor(minecraft_api_connection, command, args, func = null) {
        if(!Command.prototype.commands.includes(command))
            throw new Error("That is not a valid Minecraft Command. These are accepted:\n" + Command.prototype.commands.join("\n"))
        super(minecraft_api_connection, func, "commandRequest");
        this.command = command;
        this.arguments = args;
        this.add_game_message()
    }

    /**
     * Gets the command for the object.
     * 
     * @returns String representation of the command.
     */
    get_message() {
        return this.command;
    }

    /**
     * Gets the argument array for the command.
     * 
     * @returns Array with arguments for the command.
     */
    get_arguments() {
        return this.arguments;
    }

    /**
     * Overrides toString for object, adds in essential fields for 
     * the object return value.
     */
    toString() {
        // Get parent function
        var parent = super.toString()
        // Set essential fields //
        parent.body.commandLine = this.command + " " + this.arguments.join(" ");
        return parent;
    }

}

Command.prototype.commands = [
    "Move",
    "Teleport",
    "Turn",
    "Say",
    "Give",
    "Place"
]

export {Command};