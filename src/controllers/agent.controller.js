// src/controllers/agent.controller.js

// Importing the required modules
const Agent = require('../shared/db/mongodb/schemas/agent.Schema');
const asyncWrapper = require('../shared/util/base-utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller function to create a new agent
const createAgent = asyncWrapper(async (req, res) => {   
  const { password, ...agentData } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const agent = await Agent.create({ ...agentData, password: hashedPassword });

  // Generate token
  const token = jwt.sign(
    { email: agent.email, userId: agent._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // Token expires in 1 day
  );

  res.status(201).json({ message: 'Agent created', data: agent, token }); // Responding with a success message, the created agent data, and the token
});

// Controller function to get all agents
const getAllAgents = asyncWrapper(async (req, res) => {
  console.log('Fetching all agents...');
  const agents = await Agent.find({}); // Retrieving all agents from the database
  console.log('Agents fetched:', agents);
  res.status(200).json({ data: agents });  // Responding with the agents data
});

// Controller function to update agent information by ID
const updateAgentInfo = asyncWrapper(async (req, res) => { 
  const { id: agentID } = req.params;  
  const agent = await Agent.findByIdAndUpdate(agentID, req.body, {
    new: true,
    runValidators: true
  });

  if (!agent) {
    return res.status(404).json({ message: `No agent with id ${agentID}` });
  }

  res.status(200).json({ data: agent });
});

// Controller function to delete an agent by ID
const deleteAgent = asyncWrapper(async (req, res) => {
  const { id: agentID } = req.params; 
  const agent = await Agent.findByIdAndDelete(agentID);

  if (!agent) {
    return res.status(404).json({ message: `No agent with id ${agentID}` });
  }

  res.status(200).json({ message: 'Agent deleted', data: agent });
});

// Controller function to get agents with rating 100
const getAllStars = asyncWrapper(async (req, res) => {
  const agents = await Agent.find({ rating: 100 }); // Retrieve agents with a rating of 100
  if (!agents.length) {
    return res.status(404).json({ message: 'No agents with rating of 100 found' });
  }
  res.status(200).json({ data: agents });
});

// Exporting the controller functions
module.exports = {
  createAgent,
  getAllAgents,
  updateAgentInfo,
  deleteAgent,
  getAllStars,
};





