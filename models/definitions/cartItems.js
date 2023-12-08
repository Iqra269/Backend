const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class CARTITEMS extends Model {}

CARTITEMS.init(
  {
    cartItemId: {
      primaryKey: true,
      type: DataTypes.STRING(90),
    },
    cartItemQuantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "cartItems",
  }
);

module.exports = CARTITEMS;
