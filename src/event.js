/**
 * Event Handler object. Can be used in the MinecraftAPIClient to create a hook
 * for events in minecraft education.
 */

import {Message} from './message.js';


class EventHandler extends Message {

    /**
     * Creates an EventHandler object which can be sent to minecraft education.
     * 
     * @param {String} event - Event to hook in minecraft education
     * @param {Function} func - Callback function to be run on success 
     */
    constructor(minecraft_api, event, func = null) {

        if(!EventHandler.prototype.events.includes(event))
            throw new Error("That is not a valid Minecraft Event. These are accepted:\n" + EventHandler.prototype.events.join("\n"))
        super(minecraft_api, func, "subscribe")
        this.event = event;
        this.add_game_message()
    }

    /**
     * Gets the event name.
     * 
     * @returns String name for event to handle
     */
    get_message() {
        return this.event;
    }

    /**
     * Overrides toString for object, adds in essential fields for 
     * the object return value.
     */
    toString() {
        var parent = super.toString()
        // Set essential fields //
        parent.body.eventName = this.event;
        return parent;
    }
}

EventHandler.prototype.events = [
    "BlockBroken",
    "BlockPlaced",
    "CameraUsed",
    "EndOfDay",
    "EntitySpawned",
    "ItemAcquired",
    "ItemCrafted",
    "ItemDropped",
    "ItemEquipped",
    "ItemInteracted",
    "ItemNamed",
    "ItemSmelted",
    "ItemUsed",
    "MobKilled",
    "MobSpawned",
    "PlayerBounced",
    "PlayerDied",
    "PlayerMessage",
    "PlayerTeleported",
    "PlayerTravelled",
]

export {EventHandler};