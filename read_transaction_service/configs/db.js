const {Sequelize} = require('sequelize');
const mysql = require('mysql2');
require('dotenv').config();

let config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'mysql',
  database: process.env.DB_NAME,
};

function createDatabase() {
  const connection = mysql.createConnection({
    user: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to DB');
  });
  
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``, (err) => {
    if (err) throw err;
    console.log('New Database Created Successfully');
  });
  
  connection.end();
}

createDatabase();
const sequelize = new Sequelize(config);

module.exports = sequelize;