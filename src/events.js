/**
 * Written by Nathan Nesbitt, Copyright 2020.
 * 
 * These are direct implementations of the specific in game events to allow
 * for easier user implementation. 
 */

import EventHandler from './event.js';

class BlockBrokenEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "BlockBroken", func);
    }
}

class BlockPlacedEvent extends EventHandler {
    constructor(minecraft_api_connection, func) {
        super(minecraft_api_connection, "BlockPlaced", func);
    }
}

class CameraUsedEvent extends EventHandler {
    constructor(minecraft_api_connection, func) {
        super(minecraft_api_connection, "CameraUsed", func);
    }
}

class EndOfDayEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "EndOfDay", func);
    }
}

class EntitySpawnedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "EntitySpawned", func);
    }
}

class ItemAcquiredEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "ItemAcquired", func);
    }
}

class ItemCraftedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "ItemCrafted", func);
    }
}

class ItemDroppedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "ItemDropped", func);
    }
}

class ItemEquippedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "ItemEquipped", func);
    }
}

class ItemInteractedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "ItemInteracted", func);
    }
}

class ItemNamedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "ItemNamed", func);
    }
}

class ItemSmeltedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "ItemSmelted", func);
    }
}

class ItemUsedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "ItemUsed", func);
    }
}

class MobKilledEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "MobKilled", func);
    }
}

class MobSpawnedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "MobSpawned", func);
    }
}

class PlayerBouncedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "PlayerBounced", func);
    }
}

class PlayerDiedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "PlayerDied", func);
    }
}

class PlayerMessageEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "PlayerMessage", func);
    }
}

class PlayerTeleportedEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "PlayerTeleported", func);
    }
}

class PlayerTravelledEvent extends EventHandler {
    constructor(minecraft_api_connection,  func) {
        super(minecraft_api_connection, "PlayerTravelled", func);
    }
}

/**
 * This exports all of the classes so they can be used in other files.
 */

export {
    BlockBrokenEvent,
    BlockPlacedEvent,
    CameraUsedEvent,
    EndOfDayEvent,
    EntitySpawnedEvent,
    ItemAcquiredEvent,
    ItemCraftedEvent,
    ItemDroppedEvent,
    ItemEquippedEvent,
    ItemInteractedEvent,
    ItemNamedEvent,
    ItemSmeltedEvent,
    ItemUsedEvent,
    MobKilledEvent,
    MobSpawnedEvent,
    PlayerBouncedEvent,
    PlayerDiedEvent,
    PlayerMessageEvent,
    PlayerTeleportedEvent,
    PlayerTravelledEvent
}