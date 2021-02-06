class BackendMessage {
    constructor(minecraft_api_connection, file_name, target_process) {
        this.file_name = file_name;
        this.target_process = target_process;
        this.api_connection = minecraft_api_connection; 
    }

    get_filename() {
        return this.file_name;
    }

    /**
     * Sends a message to the backend of the system.
     * @param {JSON} message 
     */
    send_backend_message(message) {
        this.api_connection.add_server_message(message);
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
            },
            "body": {}
        }
        return object;
    }
}

export {BackendMessage};