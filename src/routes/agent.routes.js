// src/routes/agent.routes.js

const express = require('express');
const router = express.Router();
const AgentController = require('../controllers/agent.controller'); // Importing the AgentController to handle agent-related routes

// Route to create a new agent
router.post('/agent-create', AgentController.createAgent);

// Route to get all agents
router.get('/agents', AgentController.getAllAgents);

// Route to get agents with rating 100
router.get('/AllStars', AgentController.getAllStars);

// Route to update agent information by ID
router.patch('/agent-update-info/:id', AgentController.updateAgentInfo);

// Route to delete an agent by ID
router.delete('/agent-delete/:id', AgentController.deleteAgent);

// Export the router for use in other parts of the application
module.exports = router;
