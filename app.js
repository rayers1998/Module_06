// app.js

require('dotenv').config();   // Load environment variables from a .env file
const express = require('express');  // Import Express framework
const cors = require('cors'); // Import CORS to allow cross-origin requests
const app = express();  // Create an Express application
const port = process.env.PORT || 3004; // Define the port to run the server on

// Import the MongoDB manager to handle database connections
const MongoManager = require('./src/shared/db/mongodb/mongo-manager');

// Use CORS to handle cross-origin requests
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static('./src/public'));

// Parse URL-encoded data from forms
app.use(express.urlencoded({ extended: true }));

// Parse JSON data in requests
app.use(express.json());

// Import and register middleware
const middleWare = require('./src/shared/middleware/base-middleware');
middleWare.registerBaseMiddleWare(app);

// Import route handlers
const loginRoutes = require('./src/routes/login.routes');
const healthRoutes = require('./src/routes/health.routes');
const adminRoutes = require('./src/routes/admin.routes');
const publicRoutes = require('./src/routes/public.routes');
const regionRoutes = require('./src/routes/region.routes');
const agentRoutes = require('./src/routes/agent.routes');

// Applying route prefixes to structure API endpoints for improved clarity and organization
app.use('/api', loginRoutes);
healthRoutes.registerHealthRoutes(app);
adminRoutes.registerAdminRoutes(app);
publicRoutes.registerPublicRoutes(app);
regionRoutes.registerRegionRoutes(app);
app.use('/api', agentRoutes);

// Connect to MongoDB
MongoManager.openMongoConnection();

// Start the server and listen for requests on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
