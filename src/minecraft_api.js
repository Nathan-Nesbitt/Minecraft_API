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
        // Messages to be sent to the server 
        this.server_messages = []
        // The games messages that need to be sent
        this.game_messages = {}
        // This is a shared resource to halt attempts to connect while running a command
        this.version = 1;
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

        this.socket_free = true;

        return new Promise((resolve, reject) => {
            this.socket = new WebSocket("ws://localhost:5678");

            this.socket.onmessage = function (message) {
                console.log(message)
            }

            this.socket.onopen = () => {
                resolve();
            }

            this.socket.onclose = (code) => {
                if(!code.wasClean)
                    console.log("Error Connection with backend closed:", code.code)
                else
                    console.log("Backend Connection Closed.")
            }

            this.socket.onerror = (err) => {
                console.log(err);
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
     * server.
     * @param {JSON} message 
     */
    add_server_message(message) {
        this.server_messages.push(message)
    }

    /**
     * Adds a message to the queue of messages to be sent to the
     * game.
     * @param {Message} message 
     */
    add_game_message(message) {
        this.game_messages[message.uuid] = message;
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
        console.log(this.socket, message)
        this.socket.send(JSON.stringify(message))
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

    /**
     * Starts the connection with the webserver, then sends the commands
     * to the server based on the code written.
     */
    start() {

        this.open_game_connection()
        
        for (const [uuid, message] of Object.entries(this.game_messages)) {
            // Sends the message via sockets //
            this.send_message_to_game(message.toString())
        }
    }
}

export {MinecraftAPIClient};