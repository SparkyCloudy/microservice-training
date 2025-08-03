const {Model, DataTypes} = require("sequelize");
const {db} = require("../configs");

class User extends Model {
}

User.init({
  name: DataTypes.STRING, email: DataTypes.STRING, password: DataTypes.STRING
}, {sequelize: db, modelName: 'User'});
