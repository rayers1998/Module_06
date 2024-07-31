// src\controllers\agent.controller.js

// Importing the Agent schema to interact with the MongoDB collection
const Agent = require('../shared/db/mongodb/schemas/agent.Schema');
const asyncWrapper = require('../shared/util/base-utils');

// Controller function to create a new agent
const createAgent = asyncWrapper(async (req, res) => {   // Creating a new agent with the request body data
   const agent = await Agent.create(req.body);
    res.status(201).json({ message: 'Agent created', data: agent }); // Responding with a success message and the created agent data
});

// Controller function to get all agents
const getAllAgents = asyncWrapper(async (req, res) => {
    const agents = await Agent.find({}); // Retrieving all agents from the database and sorting them alphabetically by full name
   res.status(200).json({ data: agents });  // Responding with the sorted agents data
});


// Controller function to update agent information by ID
const updateAgentInfo = asyncWrapper(async (req, res) => { // Extracting the agent ID from the request parameters
  const { id: agentID } = req.params;  // Finding and updating the agent by ID with the request body data
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
  
  const { id: agentID } = req.params; // Extracting the agent ID from the request parameters
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
  updateAgentInfo,
  deleteAgent,
};
