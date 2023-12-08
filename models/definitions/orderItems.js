const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class ORDERITEMS extends Model {}

ORDERITEMS.init(
  {
    orderItemId: {
      primaryKey: true,
      type: DataTypes.STRING(90),
    },
    orderItemQuantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    orderItemPrice: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "orderItems",
  }
);

module.exports = ORDERITEMS;
