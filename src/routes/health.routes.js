// src\routes\health.routes.js

// Import the HealthController to handle health-related routes
const HealthController = require('../controllers/health.controller');

// Function to register health-related routes
const registerHealthRoutes = (app) => {
 
  app.get('/hello', HealthController.helloWorld); // Route to return hello World
  
  app.get('/status', HealthController.status);  // Route to check the status of the application
  
  app.get('/error', HealthController.error); // Route to simulate an error for testing purposes
}

// Export the function to register health-related routes
module.exports = { registerHealthRoutes };
