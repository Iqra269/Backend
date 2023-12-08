const roleModel = require("../models/roleModel");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  createRole: async (body) => {
    try {
      const roleId = uuidv4();
      const createRole = await roleModel.createRole(body.role, roleId);
      if (createRole.error) {
        return {
          error: createRole.error,
        };
      }
      return {
        response: createRole.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
};
