// src\shared\db\mongodb\mongo-manager.js

// Import Mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Load environment variables from a .env file
require('dotenv').config();

// Function to open a connection to the MongoDB database
const openMongoConnection = () => {
    // Get the connection object from Mongoose
    const db = mongoose.connection;
    
    // Log an error message if there's an error connecting to MongoDB
    db.on('error', console.error.bind(console, 'connection error:'));
    
    // Log a success message once the connection is successfully opened
    db.once('open', function callback () {
        console.log("Connected to MongoDB");
    });
    
    // Connect to MongoDB using the URI from environment variables
    mongoose.connect(process.env.MONGO_URI);
};

// Only allow fields defined in the schema when querying
mongoose.set('strictQuery', true);


module.exports = { openMongoConnection };



