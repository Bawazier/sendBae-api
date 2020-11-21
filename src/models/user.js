"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Country, {
        foreignKey: "countryId"
      });
      User.hasMany(models.Message, {
        foreignKey: "sender"
      });
      User.hasMany(models.Message, {
        foreignKey: "recipient",
      });
      User.hasMany(models.Contact, {
        foreignKey: "userId",
      });
      User.hasMany(models.Contact, {
        foreignKey: "friendId",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
      phoneNumber: DataTypes.BIGINT,
      bio: DataTypes.STRING,
      photo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};