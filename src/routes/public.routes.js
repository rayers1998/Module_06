// src\routes\public.routes.js

// Importing the PublicController which contains the logic for handling public routes.
const PublicController = require('../controllers/public.controller');
const validateContactForm = require('../shared/middleware/validators/contactValidator')

// Function to register public routes with the application.
const registerPublicRoutes = (app) => {
  // Route for submitting contact form
  app.post('/api/contact', validateContactForm, PublicController.contactUs);

  // Route for calculating quotes based on building type (residential, commercial, or industrial)
   app.get('/calc/:buildingType', PublicController.calculateQuote);
}

module.exports = { registerPublicRoutes };
