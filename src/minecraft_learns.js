import {BackendMessage} from './backend_message.js';

class MinecraftLearns extends BackendMessage {
    constructor(connection, file_name) {
        super(connection, file_name, "MinecraftLearns");
    }

    /**
     * Takes in data from the game, packages it inside a proper container
     * for the back end and sends it.
     * 
     * @param {JSON} data - Message from the game
     */
    send_data(data) {
        let message = this.toString()
        message.body.data = data;
        this.send_backend_message(message)
    }
}

export {MinecraftLearns};