const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const db = require('../config/database');

class UserService {

  static async count() {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM users');
    return rows[0].total;
  }

  static async getAllUsers({ page = 1, limit = 10, filters = {} }) {
    const users = await User.findAll({ page, limit, filters });
    const total = await User.count(filters);

    // Remove passwords from response
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return {
      users: usersWithoutPasswords,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    };
  }

  static async createUser({ name, email, password, address, role = 'user' }) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role
    });

    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async createAdminUser(userData) {
    return this.createUser({ ...userData, role: 'admin' });
  }

  static async createStoreOwner(userData) {
    return this.createUser({ ...userData, role: 'store_owner' });
  }

  static async getDashboardStats() {
    const StoreService = require('./store.service');
    try {
      const [userCount, storeCount, ratingCount] = await Promise.all([
        this.count(),
        StoreService.count(),
        StoreService.countRatings()
      ]);

      return { userCount, storeCount, ratingCount };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new Error('Failed to fetch dashboard statistics');
    }
  }

  //   static async getDashboardStats() {
  //   const StoreService = require('./store.service');
  //   const [userCount, storeCount, ratingCount] = await Promise.all([
  //     this.count(),
  //     StoreService.count(),
  //     StoreService.countRatings()
  //   ]);

  //   return { userCount, storeCount, ratingCount };
  // }
}

module.exports = UserService;