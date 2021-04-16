# Minecraft_API
JavaScript API for proxying communications between Minecraft Education Edition 
and External Applications. 

If you would like to get data from within Minecraft Education edition or if you 
would like to send commands to the game, you can develop your application on top
of this API.

## How does it work?
When you inject this script into the integrated Minecraft Education coding 
interface it creates a connection to the electron instance in the game, and 
opens a connection to any application listening on `ws://localhost:5678`.

## How to use?
You can simply include the distribution file `minecraft_api.js` inside of
your project. 

```html
<script type="module">
    import MinecraftAPIClient from 'https://nathan-nesbitt.github.io/Minecraft_API/src/minecraft_api.js';

    import MinecraftLearns from 'https://nathan-nesbitt.github.io/Minecraft_API/src/minecraft_learns.js';

    import DataStore from 'https://nathan-nesbitt.github.io/Minecraft_API/src/minecraft_store.js';
</script>
```

If you only want to communicate with the game, and you are writing your own library
you do not need the `MinecraftLearns` or `DataStore` imports. 

### MinecraftClientAPI

This initializes a connection with the game via websockets and provides a set 
of functions for subscribing messages to be sent to the server. We can create
an instance of the object which contains all of the methods for communication.

```js
var minecraftAPI = new MinecraftAPIClient()
```

This creates both a connection with the game, and a connection on the backend
with a WS server listening on port 5678. You can also specify a port number 
as a parameter to the `MinecraftAPIClient()` to allow for additional changes. 

This object must always be created.

### EventHandler
Creates a new event, takes an event to handle and a function to call back to 
whenever the event is triggered.

```js
var minecraftAPI = new MinecraftAPIClient();

var callback_function () {
    console.log("My Callback Function");
}

minecraftAPI.EventHandler("BlockBroken", callback_function)
```

As event handler is more complicated than necessary, there are a set of default
objects associated with the minecraftClientAPI that makes it easier to handle
events. The following are the options:

- BlockBrokenEvent
- BlockPlacedEvent
- CameraUsedEvent
- EndOfDayEvent
- EntitySpawnedEvent
- ItemAcquiredEvent
- ItemCraftedEvent
- ItemDroppedEvent
- ItemEquippedEvent
- ItemInteractedEvent
- ItemNamedEvent
- ItemSmeltedEvent
- ItemUsedEvent
- MobKilledEvent
- MobSpawnedEvent
- PlayerBouncedEvent
- PlayerDiedEvent
- PlayerMessageEvent
- PlayerTeleportedEvent
- PlayerTravelledEvent

They all take one parameter `callback_function` which is just what will be run
once the event happens.

### Command
Creates a new command, takes a command to run in game, some arguments for that
command, and an optional callback function.

```js
var minecraftAPI = new MinecraftAPIClient()

var callback_function () {
    console.log("My Callback Function");
}

minecraftAPI.Command("Say", ["Hello"], callback_function);
```

Same as the EventHandler class, there are some basic commands that are handled
so you do not have to remember the syntax:

- Move
- Teleport
- Turn
- Say
- Give
- Place

Each of these takes a list of arguments, at the moment you must look up those
arguments. They can be passed in using an array `[arg_1, arg_2, ...]`.

### DataStore
Creates an object that can be used to send data to the back end. It takes in
a minecraft_api object and a filename where the data should be saved.

```js
var datastore = new DataStore(minecraft_api, "filename.csv");
```

#### store_value(game_data)
This method allows you to write game data to the previously defined file.
It takes in 1 argument which is the data that will be written to the file,
and is written to be asynchronous using promises so you can use the `then()`
and `catch()` syntax. 

```js
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

This is a class that handles the messages to the broker for the MinecraftLearns
library. It provides the functionality to fully train and use the predictions
from models using game data produced using the DataStore library.

We can create a connection with the back-end library by running the following:


```js
var args = {
    connection: minecraft_api, 
    file_name: "", 
    model_type: "", 
    response_variables: [], 
    params: {}
}
var minecraft_learns = new MinecraftLearns(args);
```

This allows it to grab the previously loaded data file, then stores the type of
model you are going to use, along with the parameter it is predicting on, and the
columns to ignore when making the prediction.

#### process_data

This step processes the data file that was originally specified. This is 
asynchronous so you can use the `then()` javascript syntax to ensure that the
data is processed before going onto the next step.

```js
minecraft_learns.process_data();
```

#### train
This step trains the model using the data. Again this is async so you can use 
the `then()` syntax to control the process flow to wait for the backend response.

```js
minecraft_learns.train();
```

#### predict
This takes in data from the game, and makes predictions using the model on the
previously defined `response_variable`. This is async, so you can wait for the
messages from the game by using `then()`.

```js
minecraft_learns.predict(data).then(
    prediction => {
        // ... your code to control the game here // 
    }
)
```

#### plot
The plot method allows you to create a custom plot of the in game data,
which is saved to the disk for visualization.

It takes an optional filename parameter, if not specified it sets it to
a UUID.

```js
minecraft_learns.plot("filename");
```

#### save
Save allows you to save your model to the disk so it can be shared with
other people or if you want to reload it at a later time. 

It takes an optional filename parameter, and 

```js
minecraft_learns.save("filename");
```

#### load
Load allows you to load a previously trained model into the game.
The model must have been created using the `save` functionality in
minecraft_learns.

```js
minecraft_learns.load("filename");
```

## Full Example Script

```html
// Importing the libraries //
<script type="module">

import MinecraftAPIClient from 'https://nathan-nesbitt.github.io/Minecraft_API/src/minecraft_api.js';

import MinecraftLearns from 'https://nathan-nesbitt.github.io/Minecraft_API/src/minecraft_learns.js';

import DataStore from 'https://nathan-nesbitt.github.io/Minecraft_API/src/minecraft_store.js';

// Create a minecraftAPI connection
var minecraft_api = new MinecraftAPIClient();

// Create a new command to the game saying hello
minecraft_api.Say(["Hello", "Friend"]);

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
minecraft_api.BlockBrokenEvent(callback_function)
minecraft_api.BlockPlacedEvent(callback_function_2)

// Load in minecraft model using block_broken.csv created before //
var args = {
    connection: minecraft_api, 
    file_name: "block_broken.csv", 
    model_type: "decision_tree_regression", 
    response_variables: ["FeetPosY", "Biome"],
    features: ["Block"]
}

// Create a model //
var minecraft_learns = new MinecraftLearns(args);

// Create a callback function that makes a prediction based on the game data //
var callback_function_3 = function(data) {
    minecraft_learns.predict(data, ["diamond_ore"])
    .then(
        result => {
            // Then use the response to tell the user where to do in the game //
            minecraft_api.Say(["to mine this resource go", result.body.prediction]);
        }			
    )
}

// Function that cleans the data, then trains it on the previously defined params //
minecraft_learns.process_data()
    .then(minecraft_learns.train())
    .then(() => {
        // Saves the model so you can use it later //
        minecraft_learns.save();
        
        // Then we create an event handler for the game event //
        minecraft_api.PlayerTravelledEvent(callback_function_3)
    })
</script>
```

## Development
If you want to add to this, there is a basic python FLASK server that has been
included to provide simple testing of functionality. It has a webpage inside of
it called example.html which is served up from `localhost:3000`. 

If you want to see how it is communicating in the game, you can open up the
integrated terminal in the browser within the game by  

1. Pressing `c` in game
2. Clicking on `localhost:3000`
3. Right click anywhere inside of the webpage that pops up, other than the editor.
4. Click `inspect element` and click `Network` and check the `Disable Cache` box
5. Go to `Console` and it will show output from the game. To refresh the page 
    run `location.reload()`

To add new libraries to the game you simply need to:

1. Add a new JS file in `/src` called `your_library.js` that extends the 
    `backend_message.js` class.
2. Override the `toString()` so that you can use it to send a message to the 
    game. The parent `BackendMessage` has the core functionality for each 
    message but you can add additional headers and body data required for your 
    library. (See `minecraft_learns.js` for an example of how to do this)
3. Export `your_library.js` main class in the `minecraft_learns.js` file. 

You can then send messages to the back end by simply calling 
`this.send_backend_message(message)` in your class. 