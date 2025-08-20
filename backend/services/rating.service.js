const Rating = require('../models/rating.model');
const Store = require('../models/store.model');

class RatingService {
  static async submitRating({ userId, storeId, rating }) {
    const store = await Store.findById(storeId);
    if (!store) {
      throw new Error('Store not found');
    }

    const submittedRating = await Rating.createOrUpdate({
      user_id: userId,
      store_id: storeId,
      rating
    });

    return submittedRating;
  }

  static async getUserRatings(userId) {
    return Rating.getUserRatings(userId);
  }
}

module.exports = RatingService;