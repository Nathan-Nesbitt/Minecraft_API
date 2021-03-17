/**
 * Written by Nathan Nesbitt, Copyright 2020.
 */


class BackendMessage {
    constructor(minecraft_api_connection, file_name, target_process) {
        this.file_name = file_name;
        this.target_process = target_process;
        this.api_connection = minecraft_api_connection; 
        this.uuid = this.generate_UUID();
    }

    generate_UUID() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    get_filename() {
        return this.file_name;
    }

    /**
     * Sends a message to the backend of the system.
     * @param {JSON} message 
     */
    send_backend_message(message) {
        this.api_connection.send_server_message(message);
    }

    /**
     * This overrides the default toString function which can be
     * used to return a valid string representation of the object.
     */
    toString() {
        var object = {
            "header": {
                "targetProcess": this.target_process,
                "fileName": this.file_name,
                "UUID": this.uuid
            },
            "body": {}
        }
        return object;
    }
}

export default BackendMessage;