module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Transaction", {
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  });
};
