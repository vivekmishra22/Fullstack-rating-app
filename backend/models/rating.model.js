const db = require('../config/database');

class Rating {
  static async createOrUpdate({ user_id, store_id, rating }) {
    const [existing] = await db.query(
      'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
      [user_id, store_id]
    );
    
    if (existing.length > 0) {
      await db.query(
        'UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?',
        [rating, user_id, store_id]
      );
    } else {
      await db.query(
        'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
        [user_id, store_id, rating]
      );
    }
    
    return this.findByUserAndStore(user_id, store_id);
  }

  static async findByUserAndStore(user_id, store_id) {
    const [rows] = await db.query(
      'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
      [user_id, store_id]
    );
    return rows[0];
  }

  static async getUserRatings(user_id) {
    const [rows] = await db.query(
      'SELECT r.*, s.name as store_name, s.address as store_address FROM ratings r JOIN stores s ON r.store_id = s.id WHERE r.user_id = ?',
      [user_id]
    );
    return rows;
  }
}

module.exports = Rating;