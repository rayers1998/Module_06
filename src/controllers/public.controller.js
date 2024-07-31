// src/features/public/public.controller.js

// Importing shared data resources
const { validationResult } = require('express-validator'); // checks the validation results in the controller function to handle incoming data 
const ContactUs = require('../shared/db/mongodb/schemas/contactUs.Schema'); // Importing the ContactUs model for interacting with the MongoDB collection

/**
 * Handles contact incoming data (form submissions).
 * Extracts form data from the request body, saves it to the MongoDB database, and responds to the client.
 */
const contactUs = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract form data from the request body
  const {
    fullname,
    email,
    phone,
    company_name,
    project_name,
    project_desc,
    department,
    message
  } = req.body;

  try {
    // Create a new ContactUs document
    const newContact = new ContactUs({
      fullname,
      email,
      phone,
      company_name,
      project_name,
      project_desc,
      department,
      message,
      file: req.file ? req.file.filename : null // Handle file upload if present
    });

    // Save the document to the database
    await newContact.save();
    res.status(201).json({ message: 'Contact information saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while saving contact information.', error });
  }
};

/**
 * Validates the building type against a list of known valid types.
 */
const validateBuildingType = (buildingType) => {
  const validTypes = ['residential', 'commercial', 'industrial'];
  if (!validTypes.includes(buildingType)) {
    throw new Error('Invalid building type');
  }
};

/**
 * Calculates quotes based on building type and elevators count.
 */
const calculateQuote = async (req, res) => {
  const buildingType = req.params.buildingType;
  let elevators, numberOfFloors, numberOfApartments, tierOfElevator, maximumOccupancy;

  // Log all received query parameters
  console.log('Received Query Parameters:', req.query);

  switch (buildingType) {
    case 'residential':
      numberOfFloors = parseInt(req.query.numberOfFloors.trim());
      numberOfApartments = parseInt(req.query.numberOfApartments.trim());
      tierOfElevator = req.query.tier.trim();
      break;
    case 'commercial':
      numberOfFloors = parseInt(req.query.numberOfFloors.trim());
      maximumOccupancy = parseInt(req.query.maximumOccupancy.trim());
      tierOfElevator = req.query.tier.trim();
      break;
    case 'industrial':
      elevators = parseInt(req.query.elevators.trim());
      tierOfElevator = req.query.tier.trim();
      break;
    default:
      return res.status(400).json({ message: 'Unsupported building type' });
  }

  // Log the parsed values
  console.log('Building Type:', buildingType);
  console.log('Elevators:', elevators);
  console.log('Number of Floors:', numberOfFloors);
  console.log('Number of Apartments:', numberOfApartments);
  console.log('Tier of Elevator:', tierOfElevator);
  console.log('Maximum Occupancy:', maximumOccupancy);

  try {
    validateBuildingType(buildingType);

    let totalCost;

    switch (buildingType) {
      case 'residential':
        totalCost = calcResidentialCost(numberOfFloors, numberOfApartments, tierOfElevator);
        break;
      case 'commercial':
        totalCost = calcCommercialCost(numberOfFloors, maximumOccupancy, tierOfElevator);
        break;
      case 'industrial':
        totalCost = calcIndustrialCost(elevators, tierOfElevator);
        break;
      default:
        return res.status(400).json({ message: 'Unsupported building type' });
    }

    console.log('Total Cost:', totalCost);

    // Send the calculated cost as a response
    res.json({ cost: totalCost });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).send({ error: error.message });
  }
};

const calcCost = (numberOfElevators, tier) => { 
  let installationFee;
  let PricePerElevator;
  
  if(tier === "standard") {
    PricePerElevator = 8000;
    installationFee = 0.10;
  } else if(tier === "premium") {
    PricePerElevator = 12000;
    installationFee = 0.15;
  } else if(tier === "excelium") {
    PricePerElevator = 15000;
    installationFee = 0.20;
  }
  
  const totalElevatorCost = numberOfElevators * PricePerElevator;
  const totalInstallationFee = totalElevatorCost * installationFee;
  const FinalCost = totalInstallationFee + totalElevatorCost;
  
  return FinalCost;
};

// Calculation functions for RESIDENTIAL
const calcResidentialCost = (numberOfFloors, numberOfApartments, tierOfElevator) => {
  const ApartmentsPerFloor = Math.ceil(numberOfApartments / numberOfFloors);
  const RequiredElevators = Math.ceil(ApartmentsPerFloor / 6);
  const numberOfElevatorBanks = Math.ceil(numberOfFloors / 20);
  const FinalAmountOfElevators = RequiredElevators * numberOfElevatorBanks;
  const FinalQuote = calcCost(FinalAmountOfElevators, tierOfElevator);

  return FinalQuote;
};

// Calculation functions for COMMERCIAL
const calcCommercialCost = (numberOfFloors, maximumOccupancy, tierOfElevator) => {
  const totalOccupants = numberOfFloors * maximumOccupancy;
  const elevatorsPerBank = Math.ceil(totalOccupants / 200);
  const numberOfElevatorBanks = Math.ceil(numberOfFloors / 10);
  const elevatorsRequired = elevatorsPerBank * numberOfElevatorBanks + numberOfElevatorBanks;
  const finalQuote = calcCost(elevatorsRequired, tierOfElevator);

  return finalQuote;
};

// Calculation functions for INDUSTRIAL
const calcIndustrialCost = (numberOfElevators, tierOfElevator) => {
  const finalQuote = calcCost(numberOfElevators, tierOfElevator);
  return finalQuote;
};

module.exports = {
  contactUs,
  calculateQuote,
  validateBuildingType
};



