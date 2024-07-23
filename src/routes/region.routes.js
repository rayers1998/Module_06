// src\routes\region.routes.js


const RegionController = require('../features/region/region.controller'); // Import the RegionController to handle region-related routes

// Function to register region-related routes
const registerRegionRoutes = (app) => {
  // Route to create a new region
  app.post('/region-create', RegionController.createRegion);

  // Route to get details of a specific region
  app.get('/region', RegionController.getRegion);

  // Route to get all star regions
  app.get('/all-stars', RegionController.getAllStars);
}

// Export the function to register region-related routes
module.exports = { registerRegionRoutes };
