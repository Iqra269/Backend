const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class Sessions extends Model {}

Sessions.init(
  {
    sessionId: {
      primaryKey: true,
      type: DataTypes.STRING(90),
    },
    token: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "sessions",
  }
);

module.exports = Sessions;
