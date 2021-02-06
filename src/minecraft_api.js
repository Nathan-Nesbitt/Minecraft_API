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
        this.agent_event_response_ID = "00000000-0000-0000-0000-000000000000";
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
            this.socket = new WebSocket("http://localhost:3001");

            this.socket.onmessage = function (message) {
                message = JSON.parse(message);
                parent.postMessage(message)
            }

            this.socket.onopen = () => {
                resolve();
            }

            this.socket.onerror = () => {
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
        // Adds an event listener to the document 
        document.addEventListener("game_event", (event) => {
            const {
                event_data
            } = event;
        })
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
        if(this.game_messages[id])
            var callback = this.game_messages[id].get_response_function();
        if (callback)
            callback(body);
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
        
        console.log(this.game_messages)

        for (const [uuid, message] of Object.entries(this.game_messages)) {
            // Sends the message via sockets //
            this.send_message_to_game(message.toString())
        }
    }
}

export {MinecraftAPIClient};