const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class PRODUCTVARIATIONS extends Model {}

PRODUCTVARIATIONS.init(
  {
    variationId: {
      primaryKey: true,
      type: DataTypes.STRING(90),
    },
    variationPrice: {
      type: DataTypes.STRING(34),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "productVariations",
  }
);

module.exports = PRODUCTVARIATIONS;
