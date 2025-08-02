const {DataTypes} = require('sequelize');
const sequelize = require('../configs/db');

const db = {};

db.sequelize = sequelize;
db.Transaction = require('./transaction.model')(sequelize, DataTypes);

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
