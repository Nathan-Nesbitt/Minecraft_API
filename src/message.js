/**
 * Parent class for both EventHandler and Command, which defines
 * the callback function and additional functionalities. This would normally 
 * be a generic, but as Generics are not available in JavaScript this is defined 
 * as a parent. This is not to be used in code.
 */
class Message {
    
    constructor(func) {
        this.function = func;
    }

    /**
     * Sets the callback function once the object  has already been created.
     *  
     * @param {Function} func function to be run on successful response
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
}