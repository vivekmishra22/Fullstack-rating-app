const Store = require('../models/store.model');
const User = require('../models/user.model');

class StoreService {
  static async getAllStores({ page = 1, limit = 10, filters = {} }) {
    const stores = await Store.findAll({ page, limit, filters });
    const total = await Store.count(filters);
    return { stores, total, page, limit };
  }

  static async createStore({ name, email, address, ownerId = null }) {
    if (ownerId) {
      const owner = await User.findById(ownerId);
      if (!owner || owner.role !== 'store_owner') {
        throw new Error('Invalid store owner');
      }
    }

    const store = await Store.create({
      name,
      email,
      address,
      owner_id: ownerId
    });

    return store;
  }

  static async getStoreRatings(storeId) {
    return Store.getStoreRatings(storeId);
  }
}

module.exports = StoreService;