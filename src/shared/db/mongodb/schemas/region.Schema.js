// src\shared\db\mongodb\schemas\region.Schema.js

// Importing the mongoose library for MongoDB interactions
const mongoose = require('mongoose');   

// Create a schema for the Region collection in MongoDB
const Schema = mongoose.Schema;

const RegionSchema = new mongoose.Schema({
    region: {
        type: String,
        enum: {
            values: ['north', 'south', 'east', 'west'],
            message: '{VALUE} is not supported'
        },
        required: true
    },
    address: {
        type: String,
        required: true
    },
    total_ratings: {
        type: Number,
        default: 0, // Assuming you want a default value of 0 if not specified
        min: 0
    },
    manager: {
        type: Schema.Types.ObjectId, // Reference to an Agent document
        ref: 'Agent' // Assuming 'Agent' is the model name you've assigned in agent.Schema.js
    },
    top_agents: [{
        type: Schema.Types.ObjectId, // Array of references to Agent documents
        ref: 'Agent' // Referencing the same 'Agent' model
    }]
}, { timestamps: true });

module.exports = mongoose.model('Region', RegionSchema);