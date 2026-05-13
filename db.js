const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '34.172.113.167',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'notes_123230189',
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});

module.exports = pool.promise();
