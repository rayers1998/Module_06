// src\routes\public.routes.js

// Route configuration Ensure that the route configuration uses both the JWT authentication middleware and the contact form validation middleware.

const PublicController = require('../controllers/public.controller');
const validateContactForm = require('../shared/middleware/validators/contactValidator');

const registerPublicRoutes = (app) => {
  app.post('/api/contact', PublicController.contactUs);

  app.get('/calc/:buildingType', PublicController.calculateQuote);
};

module.exports = { registerPublicRoutes };// Route configuration Ensure that the route configuration uses both the JWT authentication middleware and the contact form validation middleware.
