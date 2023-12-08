const { models } = require("./index");

module.exports = {
  createUser: async (body, userId) => {
    try {
      const createdUser = await models.users.create({
        userId,
        ...body,
      });
      return {
        response: createdUser,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getUserByEmail: async (email) => {
    try {
      const user = await models.users.findOne({
        where: {
          email: email,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
      });
      return {
        response: user,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getAllUsers: async (offset, limit) => {
    try {
      const users = await models.users.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "deletedAt"],
        },
        include: {
          model: models.roles,
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
        offset: offset,
        limit: limit,
      });
      return {
        response: users,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  deletesUser: async (userId) => {
    try {
      const user = await models.users.destroy({
        where: {
          userId: userId,
        },
      });
      return {
        response: user,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getRoleByUserId: async (userId) => {
    try {
      const user = await models.users.findOne({
        where: {
          userId: userId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "deletedAt"],
        },
        include: {
          model: models.roles,
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
      });
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
