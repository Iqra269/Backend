const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class ROLES extends Model {}

ROLES.init(
  {
    roleId: {
      primaryKey: true,
      type: DataTypes.STRING(90),
    },
    role: {
      type: DataTypes.STRING(34),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "roles",
  }
);

module.exports = ROLES;
