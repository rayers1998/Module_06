// src/shared/middleware/base-middleware.js

// The JWT Authentication middleware checks for JWT tokens and ensures that the user is authenticated for certain routes.

require('dotenv').config();  // Load environment variables from a .env file
const Express = require('express');  // Import the Express library
const jwt = require('jsonwebtoken'); // Import the JSON Web Token library for handling JWTs
const cors = require('cors'); // Import CORS for handling cross-origin requests

// List of admin routes that require special handling
const adminRoutes = [
  '/email-list',
  '/region-avg',
  '/calc'
];

// Middleware to check JWT token for specific routes
const checkAuthToken = (req, res, next) => {
  // Adjust this list to include routes that require JWT authentication
  const jwtProtectedRoutes = [
   // '/api/agent-create', 
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
  app.use(cors()); // Enable CORS for all routes
  app.use(checkAuthToken); // Apply the JWT check middleware
};

// Export the function to register base middleware
module.exports = { registerBaseMiddleWare };

