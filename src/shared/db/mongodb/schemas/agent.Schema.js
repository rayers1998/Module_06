// src\shared\db\mongodb\schemas\agent.Schema.js     

// Importing the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Create a schema for the Agent collection in MongoDB
const AgentSchema = new mongoose.Schema({
    
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    
    email: {
        type: String,
        trim: true,
        required: true,
        // unique: true // Uncomment this line to ensure unique email addresses
    },
    
    region: {
        type: String,
        enum: {
            values: ['north', 'south', 'east', 'west'], // Valid values for the region
            message: '{VALUE} is not supported' // Custom error message for invalid values
        },
        required: true
    },
    
    rating: {
        type: Number,
        min: 0,
        max: 100      // Agent's rating, must be a number between 0 and 100
    },
    
    fee: {
        type: Number,
        min: 0       // Agent's fee, must be a non-negative number
    },
    
    sales: {
        type: Number,
        min: 0,
        default: 0   // Agent's sales, must be a non-negative number, defaults to 0
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields


module.exports = mongoose.model('Agent', AgentSchema);
