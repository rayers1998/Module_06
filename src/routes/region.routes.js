// src/routes/region.routes.js

const express = require('express');
const router = express.Router();
const RegionController = require('../controllers/region.controller.js'); // Import the RegionController to handle region-related routes

// Function to register region-related routes
const registerRegionRoutes = (app) => {
  // Route to create a new region
  router.post('/region-create', RegionController.createRegion);

  // Route to get details of a specific region
  router.get('/region', RegionController.getRegion);

  // Route to get all star regions
  router.get('/all-stars', RegionController.getAllStars);

  app.use('/api', router); // Add the router to the app with the /api prefix
}

// Export the function to register region-related routes
module.exports = { registerRegionRoutes };



