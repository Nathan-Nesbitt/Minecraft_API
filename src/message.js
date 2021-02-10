/**
 * Parent class for both EventHandler and Command, which defines
 * the callback function and additional functionalities. This would normally 
 * be a generic, but as Generics are not available in JavaScript this is defined 
 * as a parent. This is not to be used in code.
 */
class Message {

    constructor(minecraft_api_connection, func, message_purpose) {
        if(this.constructor == Message)
            throw new Error("You cannot initialize a message without a type.");
        
        this.function = func;
        this.message_purpose = message_purpose;
        this.minecraft_api = minecraft_api_connection;
        this.uuid = this.generate_UUID();

    }

    generate_UUID() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    /**
     * Sets the callback function once the object  has already been created.
     *  
     * @param {Function} func
     * nc function to be run on successful response
     * 
     */
    set_response_function(func) {
        this.function = func;
    }


    /**
     * Checks if the function has a defined callback function.
     * 
     * @returns True if function has defined callback function, else false.
     */
    has_response_function() {
        if(!self.function)
            return false;
        return true;
    }

    /**
     * Returns the callback function for the object.
     * 
     * @returns Callback function.
     */
    get_response_function() {
        return this.function;
    }

    toString() {
        var object = {
            "header": {
                "messageType": "commandRequest",
                "messagePurpose": this.message_purpose,
                "requestId": this.uuid,
                "version": this.minecraft_api.version,
            },
            "body": {
                "version": this.minecraft_api.version,
            }
        }
        return object;
    }

    add_game_message() {
        this.minecraft_api.add_game_message(this)
    }
} 

export {Message};