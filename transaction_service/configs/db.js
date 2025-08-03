const {Sequelize} = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

const configs = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mysql',
};

// 1. Create and export the Sequelize instance immediately.
// Your models will need this instance when they are loaded.
const sequelize = new Sequelize(configs);

// 2. Create and export the initialization function.
async function initializeDatabase() {
  // Connect to the server without specifying a database
  const connection = await mysql.createConnection({
    host: configs.host,
    port: configs.port,
    user: configs.username,
    password: configs.password
  });
  
  // Create the database if it doesn't exist
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await connection.end();
  console.log('✅ Database checked/created.');
}

function initializeSequelize() {
  initializeDatabase().then(() => {
    sequelize.authenticate().then(() => console.log('✅ Terkoneksi ke MySQL'));
    // Sync all models
    sequelize.sync({alter: true}).then(() => console.log('✅ Sinkronisasi selesai'));
  }, (reason) => {
    console.error('❌ Gagal konek atau sinkronisasi:', reason);
    process.exit(1);
  });
}

// 3. Export both the instance and the function using module.exports
module.exports = {sequelize, initializeSequelize};
