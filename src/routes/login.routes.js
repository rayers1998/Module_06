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
module.exports = loginRouter;
