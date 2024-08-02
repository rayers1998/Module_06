// src/routes/region.routes.js

//Region routes define routes related to regions. Region middleware validator ensure the region parameter is valid.

const express = require('express');
const router = express.Router();
const RegionController = require('../controllers/region.controller.js'); // Import the RegionController to handle region-related routes
const { validateRegion } = require('../shared/middleware/validators/regionValidator');

// Function to register region-related routes
const registerRegionRoutes = (app) => {
  //Routes within the function
  router.post('/region-create', RegionController.createRegion);

  
  router.get('/region', RegionController.getRegion);

  router.get('/all-stars', RegionController.getAllStars);

  // Route to get agents by region with validation
  router.get('/agents-by-region', validateRegion, RegionController.getAgentsByRegion);

  // Route to get the average rating and fee for a region
  router.get('/region-avg', RegionController.getRegionAverage);

  app.use('/api', router); // Add the router to the app with the /api prefix
}

// Export the function to register region-related routes
module.exports = { registerRegionRoutes };








