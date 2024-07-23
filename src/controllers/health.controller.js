// src\controllers\health.controller.js


const { ResponseUtil } = require('../shared/utils/response-util'); // Importing the ResponseUtil module from our shared utilities folder


require('dotenv').config(); // Loading environment variables from .env file

const port = process.env.PORT || 3004;


function isValidString(str) {   // Function to check if a string is not empty
  return typeof str === 'string' && str.trim().length > 0;  // Check if the input is a string and has at least one character after removing spaces
}

const helloWorld = async(req, res) => {    // Function to display a greeting message
  const sampleData = { greeting: 'Hello World', timestamp: new Date() };  // Creating a sample data object with a greeting and the current timestamp
  ResponseUtil.respondOk(res, sampleData, 'Greeting provided');  // Sending the response using ResponseUtil, including the sample data and a message
};

const status = async(req, res) => {      // Function to show the current environment status
  const envName = process.env.ENV_NAME;  // Getting the environment name from the environment variables
  if (!isValidString(envName)) {         // Checking if the environment name is valid (not empty)
    return ResponseUtil.respondError(res, {}, 'Invalid environment name');  // If not valid, send an error response
  }
  
  const message = `Environment '${envName}' running on port: ${port}`;  // Constructing a message with the environment name and port
  ResponseUtil.respondOk(res, { envName, port }, message);   // Sending the response using ResponseUtil, including the constructed message
};


const error = async(req, res) => {   // Function to simulate an error response
  ResponseUtil.respondError(res, {}, 'Error testing endpoint reached');  // Sending an error response using ResponseUtil
};

module.exports = { helloWorld, status, error };

