/**
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
class MinecraftAPIClient {

    constructor() {
        this.messages = []
    }

    /**
     * Opens a connection to the server, async success is an open connection
     * the reject is a failed connection with any error. 
     */
    async open_connection() {
        // Closes the socket if it already exists //
        if(this.socket)
            this.socket.close();

        return new Promise((resolve, reject) => {
            this.socket = new WebSocket("http://localhost:3000");

            this.socket.onmessage = function(message) {
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
     * Converts an event into a message for the server.
     * @param {Message} message
     * 
     * @returns JSON object for Minecraft API
     */
    generate_message(message, id) {

        // Sets the default message body value //
        var message_value = message.get_message();

        // If the new message is an Event Handler //
        if(message instanceof EventHandler) {
            var message_purpose = "subscribe"
            var message_type = "eventName"
        }
        // Else we are sending a command //
        else if (message instanceof Command) {
            var message_purpose = "commandRequest"
            var message_type = "commandLine"
            message.get_arguments().forEach((argument => {
                message_value += " " + argument;
            })) 
        }

        return {
            "header": {
                "messagePurpose": message_purpose,
                "messageType": "commandRequest",
                "requestId": id,
                "version": 1,
            },
            "body": {
                message_type: message_value,
                "version": 1
            }
        }
    }

    /**
     * Adds a message to the queue of messages to be sent to the
     * server.
     * @param {Message} message 
     */
    add_message(message) {
        if(this.messages.includes(message))
            throw "Event already exists";
        this.messages.push(message)
    }

     /**
     * This takes the message, opens a connection with the
     * server and sends the message along. This later is 
     * hooked by the .onmessage function defined in `open_connection`
     * which handles the 
     * 
     * @param {JSON} message 
     */
    send_message(message) {
        this.socket.send(JSON.stringify(message))
    }


    /**
     * Starts the connection with the webserver, then sends the commands
     * to the server based on the code written.
     */
    start() {

        this.open_connection().then(
            (success) => {
                this.messages.forEach((message, i) => {
                    // Generates a JSON format message from the object //
                    message = this.generate_message(message, i);
                    // Sends the message via sockets //
                    this.send_message(message)
                })
            },
            (exception) => {
                console.log("Error connecting to the server, is it running?")
            }
        );
    }

}