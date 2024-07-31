// src\shared\db\mongodb\mongo-manager.js

// Import Mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Load environment variables from a .env file
require('dotenv').config();

// Function to open a connection to the MongoDB database
const openMongoConnection = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 0, // No server selection timeout
        socketTimeoutMS: 0, // No socket timeout
    };

    const connectWithRetry = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI, options);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error('MongoDB connection error:', error);
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
        }
    };

    connectWithRetry();
};

// Only allow fields defined in the schema when querying
mongoose.set('strictQuery', true);

module.exports = { openMongoConnection };
