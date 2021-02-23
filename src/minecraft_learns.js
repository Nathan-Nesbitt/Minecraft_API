/**
 * Written By Nathan Nesbitt
 * 
 */

import {BackendMessage} from './backend_message.js';

class MinecraftLearns extends BackendMessage {
    /**
     * 
     * Creates a model on the back end that can be trained and used to make
     * predictions. 
     * @param {object} args - Object full of parameters
     * @param {MinecraftAPIClient} args.connection - Minecraft API Connection
     * @param {String} args.file_name - Location of the file where the data exists
     * @param {String} args.model_type - Name of the model that you will train
     * @param {Array<String>} args.response_variables - Variable that is being predicted
     * @param {Array<String>} args.features - (Optional) Columns to be used for the prediction
     * @param {Array<String>} args.features_drop - (Optional) Opposite of features, list of features to not be used
     * @param {JSON} args.params - (Optional) Other parameters to be passed to the back end
     */
    constructor(args) {
        
        // Checks if the user provided a proper model //
        if(!MinecraftLearns.prototype.models.includes(args.model_type))
            throw new Error(
                args.model_type + " is not a valid model type. These are currently accepted:\n" 
                + MinecraftLearns.prototype.models.join("\n")
            )

        
        // Checks to see if the user provided a proper response variable //
        args.response_variables.forEach(response_variable => {
            if(!MinecraftLearns.prototype.valid_response_variables.includes(response_variable))
                throw new Error(
                    response_variable + " is not a valid response variable. These are accepted:\n" 
                    + MinecraftLearns.prototype.valid_response_variables.join("\n")
                )
        });

        // Checks to see if the user provided a column that exists //
        if(args.features)
            args.features.forEach(variable => {
                if(!MinecraftLearns.prototype.valid_response_variables.includes(variable))
                    throw new Error(
                        variable + " is not a valid column to drop. These are accepted:\n" 
                        + MinecraftLearns.prototype.valid_response_variables.join("\n")
                    )
            });

        // Checks to see if the user provided a column that exists //
        if(args.features_drop)
            args.features_drop.forEach(variable => {
                if(!MinecraftLearns.prototype.valid_response_variables.includes(variable))
                    throw new Error(
                        variable + " is not a valid column to drop. These are accepted:\n" 
                        + MinecraftLearns.prototype.valid_response_variables.join("\n")
                    )
            });
        
        // Checks to see if the list of params are valid //
        if(args.params) {            
            for (const [name, value] of Object.entries(args.params)) {
                if(!MinecraftLearns.prototype.params.includes(name))
                    throw new Error(
                        variable + " is not a valid parameter to pass to the back end. These are accepted:\n" 
                        + MinecraftLearns.prototype.params.join("\n")
                    )
            }
        }
                
        // Initialize the default back end structure //
        super(args.connection, args.file_name, "MinecraftLearns");

        // Initialize all of the object values //
        this.model_type = args.model_type;
        this.response_variables = args.response_variables;
        this.features = args.features;
        this.features_drop = args.features_drop;
        this.params = args.params;
    }

    /**
     * Sends command to process data on the back end. Uses the data that was
     * provided on initialization of the object.
     * 
     * @returns {Promise} - Message Promise
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

    async predict(data, value) {
        return this.send_data("predict", data, value)
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
    send_data(func, data=null, value=null) {
        let message = this.toString()
        
        // Fill the data //
        if(data)
            message.body.data = data;

        // Value is just what we are trying to predict if the model needs it //
        if(value)
            message.body.value = value;

        // Sets the header info for the message //
        message.header.model_type = this.model_type;
        message.header.response_variables = this.response_variables;
        message.header.function = func;
        message.header.params = this.params;

        // Include features or drop features based on input from user //
        if(this.features)
            message.header.features = this.features
        else if(this.features_drop)
            message.header.features_drop = this.features_drop
        

        console.log(message)
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

MinecraftLearns.prototype.valid_response_variables = [
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
    "decision_tree_regression",
    "decision_tree_classification",
    "kmeans",
    "knn",
    "lda",
    "linear_regression",
    "random_forest_classification",
    "random_forest_regression",
    "PLS"
]

MinecraftLearns.prototype.params = [
    "one_hot_encode",
    "pca",
    "k",
    "interactions"
]


export {MinecraftLearns};