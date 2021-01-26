import {Message} from './message.js'

/**
 * Command object. Can be used in the MinecraftAPIClient to run code 
 * in minecraft education.
 */
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
    constructor(command, args, func = null) {
        super(func);
        this.command = command;
        this.arguments = args;
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

}

export {Command};