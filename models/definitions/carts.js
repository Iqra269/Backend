const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class CARTS extends Model {}

CARTS.init(
  {
    cartId: {
      primaryKey: true,
      type: DataTypes.STRING(90),
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "carts",
  }
);

module.exports = CARTS;
