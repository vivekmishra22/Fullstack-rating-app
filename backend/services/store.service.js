const db = require('../config/database');

class StoreService {
  static async count() {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM stores');
    return rows[0].total;
  }

  static async countRatings() {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM ratings');
    return rows[0].total;
  }

  static async getStoresByOwner(ownerId) {
    const [rows] = await db.query(
      'SELECT * FROM stores WHERE owner_id = ?',
      [ownerId]
    );
    return rows;
  }

  static async getStoreRatings(storeId) {
    const [rows] = await db.query(
      'SELECT * FROM ratings WHERE store_id = ?',
      [storeId]
    );
    return rows;
  }

  static async getDashboardStats() {
    const [userCount, storeCount, ratingCount] = await Promise.all([
      require('./user.service').count(),
      this.count(),
      this.countRatings()
    ]);
    
    return { userCount, storeCount, ratingCount };
  }
}

module.exports = StoreService;

// const Store = require('../models/store.model');
// const User = require('../models/user.model');

// class StoreService {
//   static async getAllStores({ page = 1, limit = 10, filters = {} }) {
//     const stores = await Store.findAll({ page, limit, filters });
//     const total = await Store.count(filters);
//     return { stores, total, page, limit };
//   }

//   static async createStore({ name, email, address, ownerId = null }) {
//     if (ownerId) {
//       const owner = await User.findById(ownerId);
//       if (!owner || owner.role !== 'store_owner') {
//         throw new Error('Invalid store owner');
//       }
//     }

//     const store = await Store.create({
//       name,
//       email,
//       address,
//       owner_id: ownerId
//     });

//     return store;
//   }

//   static async getStoreRatings(storeId) {
//     return Store.getStoreRatings(storeId);
//   }
// }

// module.exports = StoreService;