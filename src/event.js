/**
 * Event Handler object. Can be used in the MinecraftAPIClient to create a hook
 * for events in minecraft education.
 */
class EventHandler extends Message {

    /**
     * Creates an EventHandler object which can be sent to minecraft education.
     * 
     * @param {String} event - Event to hook in minecraft education
     * @param {Function} func - Callback function to be run on success 
     */
    constructor(event, func = null) {
        super(func)
        this.event = event;
    }

    /**
     * Gets the event name.
     * 
     * @returns String name for event to handle
     */
    get_message() {
        return this.event;
    }
}