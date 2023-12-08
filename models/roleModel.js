const { models } = require("./index"); //  tables

module.exports = {
  createRole: async (role, roleId) => {
    try {
      const createRole = await models.roles.create({
        role,
        roleId,
      });
      return {
        response: createRole,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
};
