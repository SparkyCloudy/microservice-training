module.exports = (sequelize, DataTypes) => {
  
  return sequelize.define("Transaction", {
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  });
};
