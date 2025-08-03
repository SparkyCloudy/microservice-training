const {Model, DataTypes} = require("sequelize");
const {db} = require("../configs");

class User extends Model {
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
  }, name: DataTypes.STRING, email: DataTypes.STRING, password: DataTypes.STRING
}, {sequelize: db});
