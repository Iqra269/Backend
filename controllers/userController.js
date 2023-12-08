const userService = require("../services/userService");
const joi = require("joi");

const createUserSchema = joi.object().keys({
  roleId: joi.string().required(),
  firstName: joi.string().required().min(3).max(34),
  lastName: joi.string().required().min(3).max(34),
  email: joi.string().email().required().max(34),
  password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,255}$")),
  confirmPassword: joi.ref("password"),
});

const paginationSchema = joi.object().keys({
  pageNo: joi.number().positive().greater(0),
  limit: joi.number().valid(5),
});

const getByIdSchema = joi.object().keys({
  userId: joi.string().required(),
});

module.exports = {
  createUser: async (req, res) => {
    try {
      const validate = await createUserSchema.validateAsync(req.body);
      const createdUser = await userService.createUser(validate);
      if (createdUser.error) {
        return res.send({
          error: createdUser.error,
        });
      }
      return res.send({
        response: createdUser.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const validate = await paginationSchema.validateAsync(req.query);
      const users = await userService.getAllUsers(validate);
      if (users.error) {
        return res.send({
          error: users.error,
        });
      }
      return res.send({
        response: users.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },

  deletesUser: async (req, res) => {
    try {
      const validate = await getByIdSchema.validateAsync(req.query);
      const user = await userService.deletesUser(validate);
      if (user.error) {
        return res.send({
          error: user.error,
        });
      }
      return res.send({
        response: user.response,
      });
    } catch (error) {
      return {
        error: error,
      };
    }
  },
};
