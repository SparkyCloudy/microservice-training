const configs = {};

const {sequelize, initializeSequelize} = require('./db');

configs.db = sequelize;

configs.init = () => {
  initializeSequelize();
};

module.exports = configs;