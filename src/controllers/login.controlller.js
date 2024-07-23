// src\controllers\login.controller.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../shared/db/mongodb/schemas/userSchema'); 

// Function to generate JWT token with user data and expiration
const generateToken = (user) => {
  return jwt.sign(
    { username: user.username, userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // Token expires in 1 day
  );
};

// Signup endpoint
exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    const result = await user.save();

    res.status(201).json({ message: "User created", userId: result._id });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: "Creating user failed" });
  }
};

// Login endpoint
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = generateToken(user);
    res.status(200).json({ token, expiresIn: 86400, userId: user._id }); // Sending token with expiration and user ID
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

// Logout endpoint
exports.logout = (req, res) => {
    // For stateless JWT, this could just inform the client to delete the token
    res.status(200).json({ message: 'Logged out successfully' });
  };

// Middleware to verify JWT token for protected routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

exports.authenticateToken = authenticateToken;
