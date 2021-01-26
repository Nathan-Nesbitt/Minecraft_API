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
of functions for subscribing messages to be sent to the server.

#### `open_connection`
Opens a connection to the game via port `3000`

#### `add_message`
Adds a message, which can either be a `Command` or an `EventHandler` and 
subscribes it within the game.

### `EventHandler`
Creates a new event, takes an event to handle and a function to call back to.

### `Command`
Creates a new command, takes a command to run in game, some arguments for that
command, and an optional callback function.


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
8. Run `git push --tag`
9. Go to https://github.com/nathan-nesbitt/Minecraft_API/releases and and publish the new version.