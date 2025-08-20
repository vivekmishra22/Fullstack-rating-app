module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  port: process.env.PORT || 5000
};