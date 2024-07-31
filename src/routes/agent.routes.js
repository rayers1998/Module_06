// src\routes\agent.routes.js

const express = require('express');
const router = express.Router();
const AgentController = require('../controllers/agent.controller'); // Importing the AgentController to handle agent-related routes
//const validateRegion = require('../shared/middleware/validators/regionValidator'); // Import regionValidator from the middleware

// Route to create a new agent
router.post('/agent-create', AgentController.createAgent);

// Route to get all agents
router.get('/agents', AgentController.getAllAgents);


// Export the router for use in other parts of the application
module.exports = router;
