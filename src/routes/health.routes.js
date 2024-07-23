// src\routes\health.routes.js

// Import the HealthController to handle health-related routes
const HealthController = require('../features/health/health.controller');

// Function to register health-related routes
const registerHealthRoutes = (app) => {
  // Route to return a "Hello World" message
  app.get('/hello', HealthController.helloWorld);

  // Route to check the status of the application
  app.get('/status', HealthController.status);

  // Route to simulate an error for testing purposes
  app.get('/error', HealthController.error);
}

// Export the function to register health-related routes
module.exports = { registerHealthRoutes };
