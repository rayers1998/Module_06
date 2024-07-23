// src\shared\middleware\validators\contactValidator.js


// Importing the 'check' and 'validationResult' functions from the 'express-validator' library
// 'check' is used to define validation rules for specific fields in a request
// 'validationResult' is used to gather the results of the validation checks and handle any validation errors
const { check, validationResult } = require('express-validator'); 

const validateContactForm = [
    // Validate the fullname field
    check('fullname')  // Specifies that the 'fullname' field in the request needs to be validated
    .trim()          // Trims whitespace from the beginning and end of the input
    .notEmpty()      // Ensures the 'fullname' field is not empty
    .withMessage('Full name is required.')  // Custom error message if the field is empty
    .isLength({ min: 2 })  // Ensures the 'fullname' is at least 2 characters long
    .withMessage('Full name must be at least 2 characters long.'),  // Custom error message if length check fails


  // Validate the email field
  check('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address.'),

  // Validate the phone field
  check('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required.')
    .isLength({ min: 10, max: 15 }) // Ensure the phone number is between 10 and 15 digits
    .withMessage('Phone number must be between 10 and 15 digits long.')
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number.'),

  // Validate the company name field
  check('company_name')
    .trim()
    .notEmpty()
    .withMessage('Company name is required.'),

  // Validate the project name field
  check('project_name')
    .trim()
    .notEmpty()
    .withMessage('Project name is required.'),

  // Validate the project description field
  check('project_desc')
    .trim()
    .notEmpty()
    .withMessage('Project description is required.'),

  // Validate the department field
  check('department')
    .trim()
    .notEmpty()
    .withMessage('Department is required.'),

  // Validate the message field
  check('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required.'),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);  // Collects all validation errors from the request
    if (!errors.isEmpty()) {  // Checks if there are any validation errors
      return res.status(400).json({ errors: errors.array() });  // If there are errors, responds with status 400 and the errors
    }
    next();  // If no errors, proceeds to the next middleware or route handler
  },
];

module.exports = validateContactForm;
