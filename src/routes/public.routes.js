// src\routes\public.routes.js

const PublicController = require('../controllers/public.controller');
const validateContactForm = require('../shared/middleware/validators/contactValidator');

const registerPublicRoutes = (app) => {
  app.post('/api/contact', validateContactForm, PublicController.contactUs);

  app.get('/calc/:buildingType', PublicController.calculateQuote);
};

module.exports = { registerPublicRoutes };