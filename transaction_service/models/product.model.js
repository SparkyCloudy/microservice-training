const {Model, DataTypes} = require("sequelize");
const {db} = require("../configs");

class Product extends Model {
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING, allowNull: false
  }, price: {
    type: DataTypes.INTEGER, allowNull: false
  }, stock: {
    type: DataTypes.INTEGER, allowNull: false
  }
}, {sequelize: db});
