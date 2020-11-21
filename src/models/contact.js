"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Contact.belongsTo(models.User, {
        foreignKey: "friendId",
      });
    }
  }
  Contact.init(
    {
      userId: DataTypes.INTEGER,
      friendId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Contact",
    }
  );
  return Contact;
};