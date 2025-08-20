const RatingService = require('../services/rating.service');
const { validationResult } = require('express-validator');

class RatingController {
  static async submitRating(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { storeId, rating } = req.body;
      const submittedRating = await RatingService.submitRating({
        userId: req.user.id,
        storeId,
        rating
      });
      
      res.json({
        message: 'Rating submitted successfully',
        rating: submittedRating
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getUserRatings(req, res) {
    try {
      const ratings = await RatingService.getUserRatings(req.user.id);
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = RatingController;