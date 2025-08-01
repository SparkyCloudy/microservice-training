module.exports = (sequelize, type) => {
  
  const Product = sequelize.define("Product", {
    name: type.STRING,
    price: type.INTEGER,
    stock: type.INTEGER,
  });
  
  Product.associate = (models) => {
    Product.hasMany(models.Transaction);
  };
  
  return Product;
};