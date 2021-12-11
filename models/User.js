const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notContains: " ",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [6] },
    },
  },
  {
    hooks: {
      beforeCreate(user) {
        return bcrypt.hash(user.password, 10).then(hashedPw => {
          user.password = hashedPw;
        });
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
