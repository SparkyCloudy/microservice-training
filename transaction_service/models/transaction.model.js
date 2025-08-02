module.exports = (sequelize, DataTypes) => {
  
  const table = sequelize.define("Transaction", {
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  });
  
  table.associate = (db) => {
    table.belongsTo(db.User);
    table.belongsTo(db.Product);
  }
  
  return table;
};
