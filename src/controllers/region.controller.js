// src/controllers/region.controller.js

const Agent = require('../shared/db/mongodb/schemas/agent.Schema');
const Region = require('../shared/db/mongodb/schemas/region.Schema');
const asyncWrapper = require('../shared/util/base-utils');

const createRegion = asyncWrapper(async (req, res) => {
  const region = await Region.create(req.body);

  // Calculate the total ratings of the top agents
  const topAgents = await Agent.find({ _id: { $in: region.top_agents } });
  const totalRatings = topAgents.reduce((sum, agent) => sum + agent.rating, 0);

  // Update the response to include total_ratings within data
  const response = {
    msg: 'Region created',
    data: {
      ...region.toObject(),
      total_ratings: totalRatings
    }
  };

  res.status(201).json(response);
});

const getRegion = asyncWrapper(async (req, res) => {
  const regionSelected = req.query.region;

  if (!regionSelected) {
    return res.status(400).json({ msg: 'Region query parameter is required' });
  }

  const region = await Region.find({ region: regionSelected.toLowerCase() });

  if (!region.length) {
    return res.status(404).json({ msg: `No region with name ${regionSelected}` });
  }

  res.status(200).json({ region: regionSelected, data: region });
});

const getAllStars = asyncWrapper(async (req, res) => {
  const north_region = await Region.find({ region: 'north' });
  const south_region = await Region.find({ region: 'south' });
  const east_region = await Region.find({ region: 'east' });
  res.status(200).json({
    region1: 'north',
    topAgent_North: north_region[0].top_agents[0],
    region2: 'east',
    topAgent_East: east_region[0].top_agents[0],
    region3: 'south',
    topAgent_South: south_region[0].top_agents[0]
  });
});

const getAgentsByRegion = asyncWrapper(async (req, res) => {
  const { region } = req.query;

  if (!region) {
    return res.status(400).json({ message: 'Region query parameter is required' });
  }

  const agents = await Agent.find({ region: region.toLowerCase() });

  if (!agents.length) {
    return res.status(404).json({ message: `No agents found in region: ${region}` });
  }

  res.status(200).json({ data: agents });
});

const getRegionAverage = asyncWrapper(async (req, res) => {
  const { region } = req.query;
  const normalizedRegion = region.toLowerCase();
  const agents = await Agent.find({ region: normalizedRegion });

  if (!agents.length) {
    return res.status(404).json({ message: `No agents found in region: ${normalizedRegion}` });
  }

  const sumRatings = agents.reduce((total, { rating }) => total + Number(rating), 0);
  const sumFees = agents.reduce((total, { fee }) => total + Number(fee), 0);
  const avgRating = (sumRatings / agents.length).toFixed(2);
  const avgFee = (sumFees / agents.length).toFixed(2);

  res.json({
    region: normalizedRegion,
    average_rating: avgRating,
    average_fee: avgFee
  });
});

module.exports = {
  createRegion,
  getRegion,
  getAllStars,
  getAgentsByRegion,
  getRegionAverage,
};








