// src\shared\middleware\validators\contactValidator.js

// Contact validator middleware validates the incoming data for the contact form.

const { check, validationResult } = require('express-validator'); 

const validateContactForm = (req, res, next) => {
const {email, phone} = req.body
  // Validate the email field
  check(email)
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address.'),

  // Validate the phone field
  check(phone)
    .trim()
    .notEmpty()
    .withMessage('Phone number is required.')
    .isLength({ min: 10, max: 15 }) // Ensure the phone number is between 10 and 15 digits
    .withMessage('Phone number must be between 10 and 15 digits long.')
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number.'),

  
  // Middleware to handle validation errors
  // (req, res, next) => {
  //   const errors = validationResult(req);  // Collects all validation errors from the request
  //   if (!errors.isEmpty()) {  // Checks if there are any validation errors
  //     return res.status(400).json({ errors: errors.array() });  // If there are errors, responds with status 400 and the errors
  //   }
   next();  // If no errors, proceeds to the next middleware or route handler
  // },
};

module.exports = {validateContactForm};
