const { body } = require('express-validator');

const validateCreateStore = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage('Name must be between 1 and 60 characters'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('address')
    .isLength({ max: 400 })
    .withMessage('Address must be less than 400 characters'),
  body('ownerId')
    .optional()
    .isInt()
    .withMessage('Owner ID must be an integer')
];

module.exports = {
  validateCreateStore
};