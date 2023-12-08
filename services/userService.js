const userModel = require("../models/userModel");
const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async (body) => {
    try {
      const userId = uuidV4();

      const user = await userModel.getUserByEmail(body.email);

      if (user.response || user.error) {
        return {
          error: "user with this email already exists",
        };
      }

      delete body.confirmPassword;
      body.password = await bcrypt.hash(body.password, 10);
      const createdUser = await userModel.createUser(body, userId);

      console.log("created user", createdUser.response.dataValues);
      if (createdUser.error) {
        return {
          error: createdUser.error,
        };
      }

      delete createdUser.response.dataValues.password;
      return {
        response: createdUser.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getAllUsers: async (query) => {
    try {
      const offset = (query.pageNo - 1) * query.limit;
      const users = await userModel.getAllUsers(offset, query.limit);

      if (!users.response || users.error) {
        return {
          error: "no user exists",
        };
      }
      return {
        response: users.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  deletesUser: async (query) => {
    try {
      const user = await userModel.deletesUser(query.userId);
      return {
        response: user,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
};
