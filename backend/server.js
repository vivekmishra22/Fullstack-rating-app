require('dotenv').config();
const app = require('./app');
const config = require('./config');
const db = require('./config/database');

// Test database connection
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

// Start server
app.listen(config.port, async () => {
  console.log(`Server running on port ${config.port}`);
  await testConnection();
});