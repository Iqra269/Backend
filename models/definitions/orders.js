const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class ORDERS extends Model {}

ORDERS.init(
  {
    orderId: {
      primaryKey: true,
      type: DataTypes.STRING(90),
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "orders",
  }
);

module.exports = ORDERS;
