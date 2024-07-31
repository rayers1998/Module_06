// src/controllers/login.controller.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../shared/db/mongodb/schemas/userSchema');
const Agent = require('../shared/db/mongodb/schemas/agent.Schema'); // Import Agent schema

// Function to generate JWT token with user data and expiration
const generateToken = (user) => {
  return jwt.sign(
    { username: user.username, email: user.email, userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // Token expires in 1 day
  );
};

// Signup endpoint for Users
const signup = async (req, res) => {
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

// Login endpoint for Users
const login = async (req, res) => {
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

// Login endpoint for Agents
const loginAgent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isValid = await bcrypt.compare(password, agent.password);
    if (!isValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign(
      { email: agent.email, userId: agent._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    res.status(200).json({ token, expiresIn: 86400, userId: agent._id }); // Sending token with expiration and user ID
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

// Logout endpoint
const logout = (req, res) => {
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

module.exports = { signup, login, loginAgent, logout, authenticateToken };

