import {BackendMessage} from './backend_message.js';

class MinecraftLearns extends BackendMessage {
    /**
     * 
     * @param {MinecraftAPIClient} connection - Minecraft API Connection
     * @param {String} file_name - Location of the file where the data exists
     * @param {String} model_type - Name of the model that you will train
     * @param {String} response_variable - Variable that is being predicted
     */
    constructor(connection, file_name, model_type, response_variable) {
        // Checks if the user provided a proper model //
        if(!MinecraftLearns.prototype.models.includes(model_type))
        throw new Error(
            "That is not a valid model type. These are currently accepted:\n" 
            + MinecraftLearns.prototype.models.join("\n")
        )

        // Checks to see if the user provided a proper response variable //
        if(!MinecraftLearns.prototype.response_variables.includes(response_variable))
            throw new Error(
                "That is not a valid response variable. These are accepted:\n" 
                + MinecraftLearns.prototype.response_variables.join("\n")
            )
        super(connection, file_name, "MinecraftLearns");
        this.model_type = model_type;
        this.response_variable = response_variable;
    }

    /**
     * Sends command to process data on the back end. Uses the data that was
     * provided on initialization of the object.
     * 
     * @returns {Promise}
     */
    async process_data() {
        this.send_data("process")
    }


    /**
     * Sends command to train the model on the back end. Uses the data that was
     * provided on initialization of the object.
     * 
     * @returns {Promise}
     */
    async train() {
        return this.send_data("train")
    }

    /**
     * Function that makes a prediction using the model that was trained using 
     * the specified data. It makes the prediction using the parameter `data`
     * and uses the defined response_variable to predict on.  
     * @param {JSON} data 
     * 
     * @returns {Promise}
     */

    async predict(data) {
        return this.send_data("predict", data)
    }

    /**
     * Takes in data from the game, packages it inside a proper container
     * for the back end and sends it.
     * 
     * @param {String} func - Which function called this
     * @param {JSON} data - Message from the game
     * 
     * @returns {Promise}
     */
    send_data(func, data=null) {
        let message = this.toString()
        
        // Fill the data //
        if(data)
            message.body.data = data;

        // Sets the header info for the message //
        message.header.model_type = this.model_type;
        message.header.response_variable = this.response_variable;
        message.header.function = func;
        
        // Send the message to the backend //
        this.send_backend_message(message)
        
        // Creates a promise for the event data once it is returned 
        return new Promise(function(resolve, reject) {
            document.addEventListener(this.uuid, (result) => {
                console.log(this.uuid, func, result)
                if(result.detail.success)
                    resolve(result.detail.data);
                else
                    reject(result.detail.data);
            })
        }.bind(this))
    }
}

MinecraftLearns.prototype.response_variables = [
    "eventName",
    "triggerTime",
    "Count",
    "RecordCnt",
    "SeqMax",
    "SeqMin",
    "Biome",
    "Block",
    "DestructionMethod",
    "Difficulty",
    "Dim",
    "FeetPosX",
    "FeetPosY",
    "FeetPosZ",
    "Health",
    "Light",
    "Mode",
    "Namespace",
    "NearbyAnimals",
    "NearbyMonsters",
    "NearbyOther",
    "NearbyPlayers",
    "NearbyVillagers",
    "PlayerBiome",
    "PlayerGameMode",
    "PlayerLevel",
    "PlayerSpeed",
    "Role",
    "RotX",
    "RotY",
    "TimeOfDay",
    "ToolItemType",
    "Type",
    "Variant",
    "WorldFeature",
    "editionType",
    "PlacementMethod"
]

MinecraftLearns.prototype.models = [
    "decision_tree",
    "kmeans",
    "knn",
    "lda",
    "linear_regression",
    "random_forest_classification",
    "random_forest_regression",
    "PLS"
]


export {MinecraftLearns};