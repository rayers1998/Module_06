// src\routes\public.routes.js

/* public routes: 
- Uses the contactValidationRules and validate middleware for the contact form route.
- Created a new validator 'buildingTypeValidator' to ensure the building type parameter is valid. */

const express = require('express');
const PublicController = require('../controllers/public.controller');
const { contactValidationRules, validate } = require('../shared/middleware/validators/contactValidator');
const { validateBuildingType } = require('../shared/middleware/validators/buildingTypeValidator');

const registerPublicRoutes = (app) => {
  // Route to handle contact form submissions with validation
  app.post('/api/contact', contactValidationRules(), validate, PublicController.contactUs);

  // Route to calculate quotes based on building type with validation
  app.get('/calc/:buildingType', validateBuildingType, PublicController.calculateQuote);
};

module.exports = { registerPublicRoutes };
