// src/shared/middleware/validators/regionValidator.js

// List of valid regions the middleware checks against.
const validRegions = ['north', 'south', 'east', 'west'];

// Middleware function extracts the 'region' query parameter from the incoming request.
const validateRegion = (req, res, next) => {
  const { region } = req.query;

  // Checks if the 'region' is provided.
  if (!region) {
    // If the reion query parameter is missing, the middleware reponds a with a 400 status code.
    return res.status(400).json({ message: 'Region query parameter is required' });
  }

  // Checks if the 'region' is valid.
  if (!validRegions.includes(region.toLowerCase())) {
    // If the provided region is not in the list of valid regions, the middleware responds with a 400 status code.
    return res.status(400).json({ message: 'Invalid region specified' });
  }

  // If the region is valid, the middleware calls next() to pass control to the next middleware function or route handler.
  next();
};

// Export the validateRegion middleware for use in other files
module.exports = { validateRegion };
