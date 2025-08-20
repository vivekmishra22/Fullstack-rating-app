const User = require('../models/user.model');

class UserService {
  static async getAllUsers({ page = 1, limit = 10, filters = {} }) {
    const users = await User.findAll({ page, limit, filters });
    const total = await User.count(filters);
    return { users, total, page, limit };
  }

  static async createAdminUser({ name, email, password, address }) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      role: 'admin'
    });

    return user;
  }

  static async createStoreOwner({ name, email, password, address }) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      role: 'store_owner'
    });

    return user;
  }
}

module.exports = UserService;
