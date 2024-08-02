// src/controllers/public.controller.js

const { validationResult } = require('express-validator'); // checks the validation results in the controller function to handle incoming data 
const ContactUs = require('../shared/db/mongodb/schemas/contactUs.Schema'); // Importing the ContactUs model for interacting with the MongoDB collection

/** Console logs have been added to each function to ensure:
 - parameter values are logged to help understand the inputs of each function.
 - results of calculations are logged to confirm they are correct.
 - errors are logged with detailed messages to aid in debugging.
  */

//  * Extracts 'contactUs' form data from the request body, saves it to the MongoDB database, and responds to the client. 
const contactUs = async (req, res) => {
  console.log('contactUs function called');

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
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

    console.log('Saving new contact:', newContact);
    // Save the document to the database
    await newContact.save();
    console.log('Contact information saved successfully!');
    res.status(201).json({ message: 'Contact information saved successfully!' });
  } catch (error) {
    console.error('Error saving contact information:', error);
    res.status(500).json({ message: 'An error occurred while saving contact information.', error });
  }
};

const validateBuildingType = (buildingType) => {
  console.log('validateBuildingType function called with:', buildingType);
  const validTypes = ['residential', 'commercial', 'industrial'];
  if (!validTypes.includes(buildingType)) {
    throw new Error('Invalid building type');
  }
};

const calculateQuote = async (req, res) => {
  console.log('calculateQuote function called');
  const buildingType = req.params.buildingType;
  let elevators, numberOfFloors, numberOfApartments, tierOfElevator, maximumOccupancy;

  console.log('Received Query Parameters:', req.query);

  switch (buildingType) {
    case 'residential':
      numberOfFloors = parseInt(req.query.numberOfFloors?.trim());
      numberOfApartments = parseInt(req.query.numberOfApartments?.trim());
      tierOfElevator = req.query.tier?.trim();
      if (!tierOfElevator || !numberOfFloors || !numberOfApartments) {
        return res.status(400).json({ message: 'All parameters are required for residential' });
      }
      break;
    case 'commercial':
      numberOfFloors = parseInt(req.query.numberOfFloors?.trim());
      maximumOccupancy = parseInt(req.query.maximumOccupancy?.trim());
      tierOfElevator = req.query.tier?.trim();
      if (!tierOfElevator || !numberOfFloors || !maximumOccupancy) {
        return res.status(400).json({ message: 'All parameters are required for commercial' });
      }
      break;
    case 'industrial':
      elevators = parseInt(req.query.elevators?.trim());
      tierOfElevator = req.query.tier?.trim();
      if (!tierOfElevator || !elevators) {
        return res.status(400).json({ message: 'Elevators and tier are required for industrial' });
      }
      break;
    default:
      console.log('Unsupported building type:', buildingType);
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
  console.log('calcCost function called with:', { numberOfElevators, tier });
  let installationFee;
  let PricePerElevator;

  if (tier === "standard") {
    PricePerElevator = 8000;
    installationFee = 0.10;
  } else if (tier === "premium") {
    PricePerElevator = 12000;
    installationFee = 0.15;
  } else if (tier === "excelium") {
    PricePerElevator = 15000;
    installationFee = 0.20;
  }

  const totalElevatorCost = numberOfElevators * PricePerElevator;
  const totalInstallationFee = totalElevatorCost * installationFee;
  const FinalCost = totalInstallationFee + totalElevatorCost;

  console.log('Calculated Final Cost:', FinalCost);
  return FinalCost;
};

const calcResidentialCost = (numberOfFloors, numberOfApartments, tierOfElevator) => {
  console.log('calcResidentialCost function called with:', { numberOfFloors, numberOfApartments, tierOfElevator });
  const ApartmentsPerFloor = Math.ceil(numberOfApartments / numberOfFloors);
  const RequiredElevators = Math.ceil(ApartmentsPerFloor / 6);
  const numberOfElevatorBanks = Math.ceil(numberOfFloors / 20);
  const FinalAmountOfElevators = RequiredElevators * numberOfElevatorBanks;
  return calcCost(FinalAmountOfElevators, tierOfElevator);
};

const calcCommercialCost = (numberOfFloors, maximumOccupancy, tierOfElevator) => {
  console.log('calcCommercialCost function called with:', { numberOfFloors, maximumOccupancy, tierOfElevator });
  const totalOccupants = numberOfFloors * maximumOccupancy;
  const elevatorsPerBank = Math.ceil(totalOccupants / 200);
  const numberOfElevatorBanks = Math.ceil(numberOfFloors / 10);
  const elevatorsRequired = elevatorsPerBank * numberOfElevatorBanks + numberOfElevatorBanks;
  return calcCost(elevatorsRequired, tierOfElevator);
};

const calcIndustrialCost = (numberOfElevators, tierOfElevator) => {
  console.log('calcIndustrialCost function called with:', { numberOfElevators, tierOfElevator });
  return calcCost(numberOfElevators, tierOfElevator);
};

module.exports = {
  contactUs,
  calculateQuote,
  validateBuildingType
};
