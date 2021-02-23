/**
 * Written by Nathan Nesbitt, Copyright 2020.
 */


/**
 * 
 * This is the basic MinecraftAPIClient class that allows users to
 * write code and communicate with the game.
 * 
 * The main idea is that
 * you create functions that are called when an event occurs or 
 * after a command is run. These event hooks and commands are sent
 * to the server to be run, if they succeed the JS calls the function.
 * If the command or hook fails, then the function is not called and 
 * an error is printed to the console.
 *  
 */

import {EventHandler} from './event.js';
import {Command} from './command.js';


class MinecraftAPIClient {

    constructor() {
        // The games messages that need to be sent
        this.game_messages = {}
        // This is a shared resource to halt attempts to connect while running a command
        this.version = 1;
        // Create connection to game when you create the object //
        this.open_game_connection()
        // Opens a back end connection immediately //
        this.open_backend_connection();
    }

    /**
     * Opens a connection to the backend, async success is an open connection
     * the reject is a failed connection with any error. This allows for 
     * proxying of game data to a back end that processes the data. 
     */
    async open_backend_connection() {
        // Closes the socket if it already exists //
        if (this.socket)
            this.socket.close();

        return new Promise((resolve, reject) => {
            this.socket = new WebSocket("ws://localhost:5678");

            this.socket.onmessage = function (message) {
                var backend_message = JSON.parse(message.data)
                var uuid = backend_message.header.UUID
                var success = true;
                // If there was an error, set it as an error
                if(!backend_message.header.status) 
                    success = false;
                
                // Trigger an event with the ID of the object 
                var event = new CustomEvent(uuid, {
                    detail: {
                        "success": success,
                        "data": backend_message
                    }
                });
                // Trigger an event for that ID //
                document.dispatchEvent(event);
            }

            this.socket.onopen = () => {
                resolve();
            }

            this.socket.onclose = (code) => {
                if(!code.wasClean)
                    console.log("Error! Connection with backend closed:", code.code)
                else
                    console.log("Backend Connection Closed.")
            }

            this.socket.onerror = (err) => {
                console.log("Error from the back end connection:", err);
                reject();
            }
        })
    }

    /**
     * Opens a new game connection and sets up the handler for messages 
     * received. This really just enables a listener for the game messages
     * as the game is just using an ipcRenderer to communicate.
     */
    open_game_connection() {
        if (!window.ipcRenderer)
            return false;
        // If the app responds, we run the response handler function
        window.ipcRenderer.on("responseFromApp", (err, str) => {
            this.game_response(err, str);
        });
        return true; 
    }

    game_response(error, response) {
        // Parse the results as JSON
        var response = JSON.parse(response);

        // Handles what to do on Event vs. Command
        switch (response.header.messagePurpose) {
            case "event":
                this.run_callback(response.header.requestId, response)
                break;

            case "commandResponse":
                this.run_callback(response.header.requestId, response)
                break;

            default:
                console.log("Game Response Was Not Valid (not event or command)", response.header.messagePurpose)
                break;
        }
    }

    run_callback(id, body) {
        var callbacks = []
        // If we are dealing with a command it will have an ID
        if(this.game_messages[id])
            callbacks.push(this.game_messages[id]);
        // Since the game returns a 0x ID for events you have to search for the event type
        else {
            callbacks = Object.values(this.game_messages).filter(message => message.event === body.body.eventName)
        }
        // Only try to run commands if we actually have some commands
        if (callbacks.length > 0)
            callbacks.forEach(callback => {
                // Try to get the response function, and run it
                callback = callback.get_response_function()
                if(callback)
                    callback(body);
            })
        // Deletes the callback function if it was a command 
        if (this.game_messages[id] instanceof Command)
            delete this.game_messages[id];
    }
    
    /**
     * Adds a message to the queue of messages to be sent to the
     * game.
     * @param {Message} message 
     */
    add_game_message(message) {
        // Appends the command to the queue //
        this.game_messages[message.uuid] = message;
        // Tries to run the command //
        this.send_message_to_game(this.game_messages[message.uuid].toString())
    }

    /**
     * This takes the message, opens a connection with the
     * server and sends the message along. This later is 
     * hooked by the .onmessage function defined in `open_connection`
     * which handles the callback.
     * 
     * @param {JSON} message 
     */
    send_server_message(message) {
        // Tries to send the message if the readystate is open //
        if(this.socket.readyState === WebSocket.OPEN)
            this.socket.send(JSON.stringify(message))
        // If this code runs too fast, you need to handle it beating the connection //
        else if (this.socket.readyState === WebSocket.CONNECTING) {
            this.socket.addEventListener("open", () => {
                this.send_server_message(message)
            })
        }
    }

    /**
     * This sends a formatted message to the game, this should be run after
     * generating the message from the object.
     * 
     * @param {JSON} message 
     */
    send_message_to_game(message) {
        window.ipcRenderer.sendToHost('sendToApp', message);
    }
}

export {MinecraftAPIClient};
export {Command} from './command.js';
export {EventHandler} from './event.js';
export {MinecraftLearns} from './minecraft_learns.js';
export {DataStore} from './minecraft_store.js';