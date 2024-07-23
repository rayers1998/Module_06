// src\routes\login.routes.js

const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login.controller'); // Import the LoginController

// Route to handle user signup
router.post('/signup', LoginController.signup);

// Route to handle user login
router.post('/login', LoginController.login);

// Protected route example, using authenticateToken middleware
router.get('/protected', LoginController.authenticateToken, (req, res) => {
  res.status(200).json({ message: 'You have accessed a protected route', user: req.user });
});

module.exports = router;
