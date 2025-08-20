const UserService = require('../services/user.service');
const { validationResult } = require('express-validator');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const { page = 1, limit = 10, name, email, address, role } = req.query;
      const filters = { name, email, address, role };
      
      const result = await UserService.getAllUsers({
        page: parseInt(page),
        limit: parseInt(limit),
        filters
      });
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createAdminUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, address } = req.body;
      const user = await UserService.createAdminUser({ name, email, password, address });
      
      res.status(201).json({
        message: 'Admin user created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async createStoreOwner(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, address } = req.body;
      const user = await UserService.createStoreOwner({ name, email, password, address });
      
      res.status(201).json({
        message: 'Store owner created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;