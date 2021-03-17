/**
 * Written by Nathan Nesbitt, Copyright 2020.
 */
import BackendMessage from './backend_message.js';

export default class DataStore extends BackendMessage {

    /**
     * Creates a DataStore object that can be used to store information
     * from the game on the system.
     * 
     * @param {MinecraftAPIClient} connection - Minecraft API connection object
     * @param {String} file_name - Name of the location where the data should be saved
     */
    constructor(connection, file_name) {
        super(connection, file_name, "MinecraftStore");
    }

    /**
     * Takes in data from the game, packages it inside a proper container
     * for the back end and sends it.
     * 
     * @param {JSON} data - Message from the game
     */
    async store_value(data) {
        // Sends the data to the backend 
        let message = this.toString()
        message.body.data = data;
        this.send_backend_message(message)

        // Creates a promise for the event data once it is returned 
        return new Promise(function(resolve, reject) {
            document.addEventListener(this.uuid, (result) => {
                if(result.detail.success)
                    resolve(result.detail.data);
                else
                    reject(result.detail.data);
            })
        }.bind(this))
    }

}

export default DataStore;