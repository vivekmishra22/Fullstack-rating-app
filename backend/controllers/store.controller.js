const StoreService = require('../services/store.service');
const { validationResult } = require('express-validator');

class StoreController {
  static async getAllStores(req, res) {
    try {
      const { page = 1, limit = 10, name, email, address } = req.query;
      const filters = { name, email, address };
      
      const result = await StoreService.getAllStores({
        page: parseInt(page),
        limit: parseInt(limit),
        filters
      });
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createStore(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, address, ownerId } = req.body;
      const store = await StoreService.createStore({ name, email, address, ownerId });
      
      res.status(201).json({
        message: 'Store created successfully',
        store
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getStoreRatings(req, res) {
    try {
      const { storeId } = req.params;
      const ratings = await StoreService.getStoreRatings(storeId);
      
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = StoreController;