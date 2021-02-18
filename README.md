# Minecraft_API
Front End API for Communicating with Minecraft API in the Browser.

## How to use?
You can simply include the distribution file `minecraft_api.js` inside of
your project. 

```html
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

```js
var minecraftAPI = new MinecraftAPIClient()
```

This creates both a connection with the game, and a connection on the backend
with a WS server listening on port 5678.

This must be run first.

### EventHandler
Creates a new event, takes an event to handle and a function to call back to 
whenever the event is triggered.

```js
var minecraftAPI = new MinecraftAPIClient()

var callback_function () {
    console.log("My Callback Function");
}

new EventHandler(minecraftAPI, "BlockBroken", callback_function)
```

### Command
Creates a new command, takes a command to run in game, some arguments for that
command, and an optional callback function.

```js
var minecraftAPI = new MinecraftAPIClient()

var callback_function () {
    console.log("My Callback Function");
}

new Command(minecraftAPI, "Say", ["Hello"], callback_function);
```

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
var minecraft_learns = new MinecraftLearns(minecraft_api, "<file_location>.csv", "<model_type>", "<response_variable>");
```

This allows it to grab the previously loaded data file, then stores the type of
model you are going to use, along with the parameter it is predicting on.

#### process_data

This step processes the data file that was originally specified. This is 
asynchronous so you can use the `then()` javascript syntax to ensure that the
data is processed before going onto the next step.

```js
minecraft_learns.process_data()
```

#### train
This step trains the model using the data. Again this is async so you can use 
the `then()` syntax to control the process flow to wait for the backend response.

```js
minecraft_learns.train()
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

## Full Example Script

```js
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

// Load in minecraft model using foo.csv created before, predicting based on "Block" type using Linear Regression //
var minecraft_learns = new MinecraftLearns(minecraft_api, "foo.csv", "linear_regression", "Block");

// Create a callback function that makes a prediction based on the game data //
var callback_function_3 = function(data) {
    minecraft_learns.predict(data) // Make a prediction based on the game data //
    .then(
        // Then use the response to move in that direction //
        result => {
            new Command(minecraft_api, "say", ["to mine this resource go to", result]);
        }			
    )
}

// Function that cleans the data, then trains it on the previously defined params //

minecraft_learns.process_data() // Clean the data //
    .then(minecraft_learns.train()) // Train the model using the data //
    .then(
        new EventHandler(minecraft_api, "PlayerTravelled", callback_function)
    )
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