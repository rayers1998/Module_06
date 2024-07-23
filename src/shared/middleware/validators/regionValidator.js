// src/shared/middleware/validators/regionValidator.js


// List of valid regions
const validRegions = ['north', 'south', 'east', 'west'];

// Middleware to validate the 'region' query parameter
const validateRegion = (req, res, next) => {
  const { region } = req.query;

  // Check if the 'region' query parameter is provided
  if (!region) {
    // Respond with a 400 status code if 'region' is missing
    return res.status(400).json({ message: 'Region query parameter is required' });
  }

  // Check if the provided 'region' is in the list of valid regions
  if (!validRegions.includes(region.toLowerCase())) {
    // Respond with a 400 status code if 'region' is invalid
    return res.status(400).json({ message: 'Invalid region specified' });
  }

  // Proceed to the next middleware or route handler if 'region' is valid
  next();
};

// Export the validateRegion middleware for use in other files
module.exports = validateRegion;



