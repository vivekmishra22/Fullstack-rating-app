const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/rating.controller');
const { validateSubmitRating } = require('../middlewares/validators/rating.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, validateSubmitRating, RatingController.submitRating);
router.get('/user', authMiddleware, RatingController.getUserRatings);

module.exports = router;