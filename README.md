# Minecraft_API
Front End API for Communicating with Minecraft API in the Browser.

## How to use?
You can simply include the distribution file `minecraft_api.js` inside of
your project. 

```{html}
<script>
    import {EventHandler, Command, MinecraftLearns, DataStore, MinecraftAPIClient} from 'https://nathan-nesbitt.github.io/Minecraft_API/src/minecraft_api.js';
</script>
```

This file contains a set of objects that allow for communication between 
minecraft education and the browser. You do not have to include all of them,
but if you are not sure what you are doing that is the easiest way to ensure
that the code is working.

### MinecraftClientAPI

This initializes a connection with the game via websockets and provides a set 
of functions for subscribing messages to be sent to the server. We can create
an instance of the object which contains all of the methods for communication.

```{js}
var minecraftAPI = new MinecraftAPIClient()
```

#### `open_backend_connection()`
Opens a connection to the back end server via port `5678`

```
minecraftAPI.open_backend_connection()
```

### `start`
Runs all of the commands and events in the queue initializing a connection with
the game. This should be the last thing run.

```{js}
minecraftAPI.start()
```

#### `add_game_message`
Adds a message, which can either be a `Command` or an `EventHandler`, to the 
game queue. This is only sent to the server once the `start` method is called.

```
var minecraftAPI = new MinecraftAPIClient()

var callback_function () {
    console.log("My Callback Function");
}

// For an event //
new EventHandler(minecraftAPI, "BlockBroken", callback_function)

// For a command //
new Command(minecraftAPI, "Say", ["Hello"], callback_function)

```

### `EventHandler`
Creates a new event, takes an event to handle and a function to call back to 
whenever the event is triggered.

```
var minecraftAPI = new MinecraftAPIClient()

var callback_function () {
    console.log("My Callback Function");
}

new EventHandler(minecraftAPI, "BlockBroken", callback_function)
```

### `Command`
Creates a new command, takes a command to run in game, some arguments for that
command, and an optional callback function.

```
var minecraftAPI = new MinecraftAPIClient()

var callback_function () {
    console.log("My Callback Function");
}

new Command(minecraftAPI, "Say", ["Hello"], callback_function);
```

### DataStore
Creates an object that can be used to send data to the back end. It takes in
a minecraft_api object and a filename where the data should be saved.

```{js}
var datastore = new DataStore(minecraft_api, "filename.csv");
```

#### store_value(game_data)
This method allows you to write game data to the previously defined file.
It takes in 1 argument which is the data that will be written to the file,
and is written to be asynchronous using promises so you can use the `then()`
and `catch()` syntax. 

```{js} 
datastore.store_value(game_data)
    .then((result) => {
        // If the insertion is successful //
        console.log("Successful insertion into back end", result)
    }).catch(err => {
        // If you run into an error inserting into the file //
        console.log("Error submitting data to back end.", err);
    });
```

### MinecraftLearns

## Full Example Script

```{js}
// Importing the libraries //

import {EventHandler, Command, MinecraftLearns, DataStore, MinecraftAPIClient} from 'https://nathan-nesbitt.github.io/Minecraft_API/src/minecraft_api.js';

// Create a minecraftAPI connection
var minecraft_api = new MinecraftAPIClient();

// Create a new command to the game
new Command(minecraft_api, "Say", ["Hello", "Friend"]);

// Creates 2 separate datastore connections for saving backend data //
var datastore = new DataStore(minecraft_api, "foo.csv")
var datastore_2 = new DataStore(minecraft_api, "foo_2.csv")

// Callback function that handles game data and saves it to the first file //
var callback_function = function(game_data) {
    datastore.store_value(game_data)
        .then((result) => {
            console.log("Successful insertion into back end", result)
        }).catch(err => {
            console.log("Error submitting data to back end.", err);
        });
}

// Callback function that handles game data and saves it to the second file //
var callback_function_2 = function(game_data) {
    datastore_2.store_value(game_data)
        .then((result) => {
            console.log("Successful insertion into back end", result)
        }).catch(err => {
            console.log("Error submitting data to back end.", err);
        });
}

// Creates two new event handlers for blocks being broken and placed //
new EventHandler(minecraft_api, "BlockBroken", callback_function)
new EventHandler(minecraft_api, "BlockPlaced", callback_function_2)

// Opens a connection to the back end //
minecraft_api.open_backend_connection();
// Opens the connection to the game //
minecraft_api.start()
```