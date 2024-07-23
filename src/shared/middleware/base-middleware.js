/* Base-middleware file is crucial for setting up foundational middleware for my Express application. It ensures:
* Incoming requests are parsed as JSON.
* Each API call is logged with details.
* Admin routes are secured with authentication token validation. 
*/


// src/shared/middleware/base-middleware.js


require('dotenv').config();  // Load environment variables from a .env file
const Express = require('express');  // Import the Express library
//const chalk = require('chalk'); // Import the Chalk library for colored console logs
const jwt = require('jsonwebtoken'); // Import the JSON Web Token library for handling JWTs

// List of admin routes that require special handling
const adminRoutes = [
  '/email-list',
  '/region-avg',
  '/calc'
];

// Middleware for logging API calls with colors
const coloredLogger = (req, res, next) => {  
  const timestamp = chalk.blue(new Date().toLocaleString('en-CA', { timeZone: 'America/New_York' })); // Create a timestamp with a specific format and time zone
  const method = req.method; // Get the HTTP method of the request (GET, POST, etc.)
  const methodColor = method === 'GET' ? chalk.green :  // Choose a color based on the HTTP method
                      method === 'POST' ? chalk.blue :
                      method === 'DELETE' ? chalk.red : chalk.yellow;
  const methodStyled = methodColor.bold(method);  // Style the method text with the chosen color
  const urlStyled = chalk.cyan(req.originalUrl);  // Style the URL text
  const timezone = 'Eastern Daylight Time'; // Define the time zone for logging

  console.log(`API call: ${methodStyled} ${urlStyled} at ${timestamp} [${timezone}]`);  // Print the log message with colored method and URL
  next();  // Move on to the next middleware function
};

// Middleware to check JWT token for specific routes
const checkAuthToken = (req, res, next) => {
  // Adjust this list to include routes that require JWT authentication
  const jwtProtectedRoutes = [
    '/api/agent-create', 
    '/api/region', 
    /* '/api/agents', Uncomment to protect the agents route */
    '/api/agent-update-info', 
    '/api/agent-delete', 
    '/region-create', 
    '/all-stars',
    '/region-avg',
    '/region',
    '/api/agents-by-region',
    '/email-list'
  ];

  // Get the route (base URL), and remove query parameters if present
  const baseUrl = req.url.split('?')[0];

  
  if (jwtProtectedRoutes.some(protectedPath => baseUrl.startsWith(protectedPath))) {  // Check if the current route requires JWT authentication
    const authHeader = req.headers.authorization; // Get the Authorization header from the request
    
    if (authHeader && authHeader.startsWith('Bearer ')) { // Check if the header exists and starts with 'Bearer '
      const token = authHeader.substring(7); // Extract the token from the header
    
      
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {   //  Verify the token using the secret key  
          if (err) { 
          return res.status(403).json({ message: 'Forbidden: Invalid token' }); // If there's an error verifying the token, respond with Forbidden
        }
        req.user = decoded; // If the token is valid, attach the decoded user info to the request
        next();  // Move on to the next middleware function
      });
    } else {
        return res.status(401).json({ message: 'Authorization header is required and must be in the format Bearer <token>' });  // If the Authorization header is missing or invalid, respond with Unauthorized
    }
  } else {
    next();  // If the route doesn't need JWT authentication, move on to the next middleware function
  }
};

// Function to register the base middleware for the app
const registerBaseMiddleWare = (app) => {
  
  app.use(Express.json());  // Parse JSON bodies in incoming requests
  app.use(coloredLogger);  // Apply the colored logging middleware
  app.use(checkAuthToken); // Apply the JWT check middleware
};

// Export the function to register base middleware
module.exports = { registerBaseMiddleWare };
