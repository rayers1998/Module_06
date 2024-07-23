// src\controllers\agent.controller.js

// Importing the Agent schema to interact with the MongoDB collection
const Agent = require('../../shared/db/mongodb/schemas/agent.Schema');
// Importing the asyncWrapper utility to handle asynchronous functions
const asyncWrapper = require('../shared/util/base-utils');

// Controller function to create a new agent
const createAgent = asyncWrapper(async (req, res) => {
  // Creating a new agent with the request body data
  const agent = await Agent.create(req.body);
  // Responding with a success message and the created agent data
  res.status(201).json({ message: 'Agent created', data: agent });
});

// Controller function to get all agents
const getAllAgents = asyncWrapper(async (req, res) => {
  // Retrieving all agents from the database and sorting them alphabetically by full name
  const agents = await Agent.find({}).sort('full_name');
  // Responding with the sorted agents data
  res.status(200).json({ data: agents });
});

// Controller function to get agents by region
const getAgentsByRegion = asyncWrapper(async (req, res) => {
  // Extracting the region from the query parameters
  const { region } = req.query;
  // Finding agents in the specified region
  const agents = await Agent.find({ region: region.toLowerCase() });
  
  // Checking if no agents were found in the specified region
  if (!agents.length) {
    return res.status(404).json({ message: `No agents found in ${region}` });
  }

  // Responding with the agents found in the specified region
  res.status(200).json({ data: agents });
});

// Controller function to update agent information by ID
const updateAgentInfo = asyncWrapper(async (req, res) => {
  // Extracting the agent ID from the request parameters
  const { id: agentID } = req.params;
  // Finding and updating the agent by ID with the request body data
  const agent = await Agent.findByIdAndUpdate(agentID, req.body, {
    new: true,
    runValidators: true
  });

  // Checking if no agent was found with the specified ID
  if (!agent) {
    return res.status(404).json({ message: `No agent with id ${agentID}` });
  }

  // Responding with the updated agent data
  res.status(200).json({ data: agent });
});

// Controller function to delete an agent by ID
const deleteAgent = asyncWrapper(async (req, res) => {
  // Extracting the agent ID from the request parameters
  const { id: agentID } = req.params;
  // Finding and deleting the agent by ID
  const agent = await Agent.findByIdAndDelete(agentID);

  // Checking if no agent was found with the specified ID
  if (!agent) {
    return res.status(404).json({ message: `No agent with id ${agentID}` });
  }

  // Responding with a success message and the deleted agent data
  res.status(200).json({ message: 'Agent deleted', data: agent });
});

// Exporting the controller functions
module.exports = {
  createAgent,
  getAllAgents,
  getAgentsByRegion,
  updateAgentInfo,
  deleteAgent,
};
