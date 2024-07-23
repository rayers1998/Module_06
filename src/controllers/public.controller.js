// src\features\public\public.controller.js


// Importing shared data resources
const Data = require('../shared/resources/data');

// Importing the ContactUs model for interacting with the MongoDB collection
const ContactUs = require('../shared/db/mongodb/schemas/contactUs.Schema'); 

// Importing the validator function ('validateBuildingType'). 
const { validateBuildingType } = require('../shared/util/validators'); 

/**
 * Handles contact form submissions.
 * Extracts form data from the request body, saves it to the MongoDB database, and responds to the client.
 */
const contactUs = async (req, res) => {
  // Destructuring the request body to extract the form fields
  const {
    fullname,
    email,
    phone,
    company_name,
    project_name,
    project_desc,
    department,
    message,
    file
  } = req.body;

  try {
    // Creating a new ContactUs document with the extracted form data
    const newContact = new ContactUs({
      fullname,
      email,
      phone,
      company_name,
      project_name,
      project_desc,
      department,
      message,
      file
    });

    // Saving the new ContactUs document to the MongoDB database
    await newContact.save();

    // Sending a success response back to the client indicating the data was saved
    res.status(200).json({ message: 'Contact information saved successfully!' });
  } catch (error) {
    // Sending an error response back to the client if an error occurs during the save operation
    res.status(500).json({ message: 'An error occurred while saving contact information.', error });
  }
};

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
const calcResidentialCost = (elevators) => elevators * 10000; // Replace with actual logic
const calcCommercialCost = (elevators) => elevators * 15000; // Replace with actual logic
const calcIndustrialCost = (elevators) => elevators * 20000; // Replace with actual logic

module.exports = { contactUs, calculateQuote };