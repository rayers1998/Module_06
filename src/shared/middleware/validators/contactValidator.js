// src\shared\middleware\validators\contactValidator.js

// Contact validator middleware validates the incoming data for the contact form. Includes checks for valid emails and phone #'s,

const { check, validationResult } = require('express-validator');

// Validation rules for the contact form
const contactValidationRules = () => [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email address.'),
  check('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required.')
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 digits long.')
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number.'),
];

// Middleware to handle validation result
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  contactValidationRules,
  validate,
};
