const {Model, DataTypes} = require("sequelize");
const {db} = require("../configs");

class Transaction extends Model {
}

Transaction.init({
  quantity: {
    type: DataTypes.INTEGER, allowNull: false
  }, totalPrice: {
    type: DataTypes.INTEGER, allowNull: false
  }
}, {sequelize: db});