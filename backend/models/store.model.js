const db = require('../config/database');

class Store {
  static async create({ name, email, address, owner_id = null }) {
    const [result] = await db.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
      [name, email, address, owner_id]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM stores WHERE id = ?', [id]);
    return rows[0];
  }

  static async findAll({ page = 1, limit = 10, filters = {} }) {
    let query = 'SELECT s.*, AVG(r.rating) as average_rating FROM stores s LEFT JOIN ratings r ON s.id = r.store_id WHERE 1=1';
    const params = [];
    
    if (filters.name) {
      query += ' AND s.name LIKE ?';
      params.push(`%${filters.name}%`);
    }
    
    if (filters.email) {
      query += ' AND s.email LIKE ?';
      params.push(`%${filters.email}%`);
    }
    
    if (filters.address) {
      query += ' AND s.address LIKE ?';
      params.push(`%${filters.address}%`);
    }
    
    // Group by for average rating calculation
    query += ' GROUP BY s.id';
    
    // Add pagination
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, (page - 1) * limit);
    
    const [rows] = await db.query(query, params);
    return rows;
  }

  static async count(filters = {}) {
    let query = 'SELECT COUNT(*) as total FROM stores WHERE 1=1';
    const params = [];
    
    if (filters.name) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name}%`);
    }
    
    if (filters.email) {
      query += ' AND email LIKE ?';
      params.push(`%${filters.email}%`);
    }
    
    if (filters.address) {
      query += ' AND address LIKE ?';
      params.push(`%${filters.address}%`);
    }
    
    const [rows] = await db.query(query, params);
    return rows[0].total;
  }

  static async getStoreRatings(storeId) {
    const [rows] = await db.query(
      'SELECT u.name, u.email, r.rating, r.created_at FROM ratings r JOIN users u ON r.user_id = u.id WHERE r.store_id = ?',
      [storeId]
    );
    return rows;
  }
}

module.exports = Store;