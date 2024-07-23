// src\controllers\admin.controller.js

const Data = require('../shared/resources/data');

// Function to return a list of agent emails
const emailList = (req, res) => {
  const emails = Data.agents.map(agent => agent.email);
  res.json({ emails }); // Respond with JSON for consistency
};

// Function to calculate average rating and fee for a given region
const regionAverage = (req, res) => {
  const { region } = req.query;
  const normalizedRegion = region.toLowerCase();
  const agents = Data.agents.filter(agent => agent.region.toLowerCase() === normalizedRegion);

  if (!agents.length) {
    // Use a 404 status code to indicate that the requested resource (agents in the region) was not found
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
};

module.exports = { emailList, regionAverage };