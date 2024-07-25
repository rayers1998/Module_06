// src\routes\login.routes.js

const express = require('express');

const LoginController = require('../controllers/agent.controller.js'); 


const loginRouter = (app)=> {app.post('/signup', LoginController.signup);

  // Route to handle user login
  app.post('/login', LoginController.login);
  
  // Protected route example, using authenticateToken middleware
  app.get('/protected', LoginController.authenticateToken, (req, res) => {
    res.status(200).json({ message: 'You have accessed a protected route', user: req.user });
  });

}

// // Logout route
// router.get('/logout', (req, res) => {
//   // In a real application you might blacklist the token or just inform the client
//   res.status(200).send({ message: "Logged out successfully" });
// });

module.exports = loginRouter;
