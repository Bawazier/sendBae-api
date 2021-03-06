"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.hasMany(models.Image, {
        foreignKey: "messageId"
      });
      Message.belongsTo(models.User, {
        as: "userSender",
        foreignKey: "sender"
      });
      Message.belongsTo(models.User, {
        as: "userRecipient",
        foreignKey: "recipient",
      });
    }
  }
  Message.init(
    {
      sender: DataTypes.INTEGER,
      recipient: DataTypes.INTEGER,
      read: DataTypes.BOOLEAN,
      isLastest: DataTypes.BOOLEAN,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};