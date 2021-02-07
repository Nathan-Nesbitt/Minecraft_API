import {BackendMessage} from './backend_message.js';

class DataStore extends BackendMessage {

    /**
     * Creates a DataStore object that can be used to store information
     * from the game on the system.
     * 
     * @param {MinecraftAPIClient} connection - Minecraft API connection object
     * @param {String} file_name - Name of the location where the data should be saved
     */
    constructor(connection, file_name) {
        super(connection, file_name, "Storage");
    }

    /**
     * Takes in data from the game, packages it inside a proper container
     * for the back end and sends it.
     * 
     * @param {JSON} data - Message from the game
     */
    store_value(data) {
        let message = this.toString()
        message.body.data = data;
        this.send_backend_message(message)
    }

}

export {DataStore};