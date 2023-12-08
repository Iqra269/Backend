const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class PRODUCTS extends Model {}

PRODUCTS.init(
  {
    productId: {
      primaryKey: true,
      type: DataTypes.STRING(90),
    },
    productName: {
      type: DataTypes.STRING(34),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "products",
  }
);

module.exports = PRODUCTS;
