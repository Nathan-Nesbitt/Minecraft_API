# Minecraft_API
Front End API for Communicating with Minecraft API in the Browser

## How to use?
You can simply include the distribution file `minecraft_api.js` inside of
you project

```{html}
<script src="minecraft_api.js"></script>
```

This file contains a set of objects that allow for communication between 
minecraft education and the browser. 

### MinecraftClientAPI

This initializes a connection with the game via websockets and provides a set 
of functions for subscribing messages to be sent to the server. We can create
an instance of the object which contains all of the methods for communication.

```{js}
var minecraftAPI = new MinecraftAPIClient()
```

#### `open_backend_connection`
Opens a connection to the back end server via port `3001`

### `open_game_connection`
Opens a connection to the minecraft electron application and initializes a 
callback function that handles the messages back from the server.

```{js}
minecraftAPI.open_game_connection()
```

### `start`
Runs all of the commands and events in the queue. This should be the last thing
run.

```{js}
minecraftAPI.start()
```

#### `add_game_message`
Adds a message, which can either be a `Command` or an `EventHandler`, to the 
game queue. This is only sent to the server once the `start` method is called.

```
var callback_function () {
    console.log("My Callback Function");
}

// For an event //
var event = new EventHandler("BlockBroken", callback_function)
minecraftAPI.add_game_message(event);

// For a command //
var command = new Command("Say", ["Hello"], callback_function)
minecraftAPI.add_game_message(command);
```

### `EventHandler`
Creates a new event, takes an event to handle and a function to call back to 
whenever the event is triggered.

```
var callback_function () {
    console.log("My Callback Function");
}

var event = new EventHandler("BlockBroken", callback_function)
```

### `Command`
Creates a new command, takes a command to run in game, some arguments for that
command, and an optional callback function.

```
var callback_function () {
    console.log("My Callback Function");
}

var command = new Command("Say", ["Hello"], callback_function);
minecraftAPI.add_game_message(command);
```

## Full Example Script

```
// Callback function that is triggered on event or when the command response is
// recieved
var callback_function = function () {
    console.log("CALLBACK FUNCTION!")
}

// New Minecraft Object
var minecraftAPI = new MinecraftAPIClient()

// Define the new events
var event = new EventHandler("BlockBroken", foo)
var command = new Command("Say", ["Hello"], foo)

// Enqueue the events 
minecraftAPI.add_game_message(event);
minecraftAPI.add_game_message(command);

// Open a connection with the game
minecraftAPI.open_game_connection()

// Send all of the messages to the game 
minecraftAPI.start()
```

## Developing
To develop on this repo simply have to:

1. Clone the repo
2. Run `npm install`

And when you want to build the changes into the release

3. Run `npm run build`

And when you want to push the release to the repo

4. Increment `package.json` version. 
5. Add change information to `CHANGELOG.md`
6. Run `git commit -m <your message>`
7. Run `git tag v<version number>`
8. Run `git push --follow-tags`
8. Run `git push --tag` (Not Sure if Required)
9. Go to https://github.com/nathan-nesbitt/Minecraft_API/releases and and publish the new version.