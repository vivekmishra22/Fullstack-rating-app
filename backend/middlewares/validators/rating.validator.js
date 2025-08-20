const { body } = require('express-validator');

const validateSubmitRating = [
  body('storeId')
    .isInt()
    .withMessage('Store ID must be an integer'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')
];

module.exports = {
  validateSubmitRating
};