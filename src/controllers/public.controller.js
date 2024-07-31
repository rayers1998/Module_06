// src/features/public/public.controller.js

// Importing shared data resources
// const Data = require('../shared/resources/data');

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
    res.status(200).json({ message: 'Contact information saved successfully!' });
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
  const elevators = parseInt(req.query.elevators, 10);

  try {
    validateBuildingType(buildingType);
    
    let totalCost;

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
    res.json({ cost: totalCost });

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Sample calculation functions for different building types
const calcResidentialCost = (elevators) => elevators * 10000; 
const calcCommercialCost = (elevators) => elevators * 15000; 
const calcIndustrialCost = (elevators) => elevators * 20000; 

module.exports = {
  contactUs,
  calculateQuote,
  validateBuildingType // Exporting validateBuildingType if needed elsewhere
};
