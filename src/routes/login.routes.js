// src/routes/login.routes.js

const express = require('express');
const LoginController = require('../controllers/login.controller');

const router = express.Router();

// Route to handle user signup
router.post('/signup', LoginController.signup);

// Route to handle user login
router.post('/login', LoginController.login);

// Route to handle agent login
router.post('/login-agent', LoginController.loginAgent);

// Protected route example, using authenticateToken middleware
router.get('/protected', LoginController.authenticateToken, (req, res) => {
  res.status(200).json({ message: 'You have accessed a protected route', user: req.user });
});

// Export the router
module.exports = router;




