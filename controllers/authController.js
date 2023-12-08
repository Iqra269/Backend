const authService = require("../services/authService");
const joi = require("joi");

const signupSchema = joi.object().keys({
  firstName: joi.string().required().min(3),
  lastName: joi.string().required().min(3),
  email: joi.string().email().required(),
  password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: joi.ref("password"),
});

const loginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = {
  signUp: async (req, res) => {
    try {
      const validate = await signupSchema.validateAsync(req.body);
      const serviceResponse = await authService.signUp(validate);
      if (serviceResponse.error) {
        return res.send({ error: serviceResponse.error });
      }
      return res.send({ response: serviceResponse.response });
    } catch (error) {
      return res.send({ error: error });
    }
  },
  login: async (req, res) => {
    try {
      const validate = await loginSchema.validateAsync(req.body);
      const serviceResponse = await authService.login(validate);

      if (serviceResponse.error) {
        return res.send({ error: serviceResponse.error });
      }

      const cookies = {
        token: serviceResponse.response,
      };

      const hour = 60 * 60 * 1000;
      res.cookie("auth", cookies, {
        maxAge: hour,
        httpOnly: true,
      });

      return res.send({ response: serviceResponse.response });
    } catch (error) {
      return res.send({ error: error });
    }
  },
};
