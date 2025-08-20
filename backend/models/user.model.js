const db = require('../config/database');

class User {
  static async create({ name, email, password, address, role = 'user' }) {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, address, role]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async updatePassword(id, password) {
    await db.query('UPDATE users SET password = ? WHERE id = ?', [password, id]);
  }

  static async findAll({ page = 1, limit = 10, filters = {} }) {
    let query = 'SELECT * FROM users WHERE 1=1';
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
    
    if (filters.role) {
      query += ' AND role = ?';
      params.push(filters.role);
    }
    
    // Add pagination
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, (page - 1) * limit);
    
    const [rows] = await db.query(query, params);
    return rows;
  }

  static async count(filters = {}) {
    let query = 'SELECT COUNT(*) as total FROM users WHERE 1=1';
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
    
    if (filters.role) {
      query += ' AND role = ?';
      params.push(filters.role);
    }
    
    const [rows] = await db.query(query, params);
    return rows[0].total;
  }
}

module.exports = User;