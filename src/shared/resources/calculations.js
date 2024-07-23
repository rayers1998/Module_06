// src/shared/resources/calculations.js

// Function to handle quote calculations based on building type
const calculateQuote = (req, res) => {
    const buildingType = req.params.buildingType.toLowerCase();
    const { elevators } = req.query;
  
    // Validate the building type
    if (!validateBuildingType(buildingType)) {
      return res.status(400).json({ message: 'Invalid building type' });
    }
  
    // Validate elevators query parameter to ensure the data provided by the user is correct and meets the expected criteria before performing any calculations or further processing. 
    if (isNaN(elevators) || elevators <= 0) {
      return res.status(400).json({ message: 'Invalid number of elevators' });
    }
  
    let totalCost;
  
    // Switch case for different building types
    switch (buildingType) {
      case 'residential':
        totalCost = calcResidentialCost(elevators);
        break;
      case 'commercial':
        totalCost = calcCommercialCost(elevators);
        break;
      case 'industrial':
        totalCost = calcIndustrialCost(elevators);
        break;
      default:
        return res.status(400).json({ message: 'Unsupported building type' });
    }
  
    // Send the calculated cost as a response
    res.send({ cost: totalCost });
  };
  
  // Sample calculation functions for different building types
  const calcResidentialCost = (elevators) => elevators * 10000; 
  const calcCommercialCost = (elevators) => elevators * 15000; 
  const calcIndustrialCost = (elevators) => elevators * 20000; 
  
  module.exports = { contactUs, calculateQuote };