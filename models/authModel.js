const { models } = require("./index");

module.exports = {
  signUp: async (body) => {
    try {
      return {
        reponse: body,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
};
