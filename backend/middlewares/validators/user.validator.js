const { body } = require('express-validator');

const validateCreateAdmin = [
  body('name')
    .trim()
    .isLength({ min: 8, max: 60 })
    .withMessage('Name must be between 20 and 60 characters'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be between 8 and 16 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
  body('address')
    .optional()
    .isLength({ max: 400 })
    .withMessage('Address must be less than 400 characters')
];

const validateCreateStoreOwner = [
  body('name')
    .trim()
    .isLength({ min: 8, max: 60 })
    .withMessage('Name must be between 8 and 60 characters'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be between 8 and 16 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
  body('address')
    .optional()
    .isLength({ max: 400 })
    .withMessage('Address must be less than 400 characters')
];

module.exports = {
  validateCreateAdmin,
  validateCreateStoreOwner
};