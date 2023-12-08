const bcrypt = require("bcrypt");
const authModel = require("../models/authModel");
const userModel = require("../models/userModel");
const sessionModel = require("../models/sessionModel");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const { v4: uuidV4 } = require("uuid");

module.exports = {
  signUp: async (body) => {
    try {
      delete body.confirmPassword;
      body.password = await bcrypt.hash(body.password, 10);
      const signUpResponse = await authModel.signUp(body);
      if (signUpResponse.error) {
        return {
          error: signUpResponse.error,
        };
      }
      return {
        response: signUpResponse.reponse,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  login: async (body) => {
    try {
      const loginResponse = await userModel.getUserByEmail(body.email);
      if (loginResponse.error || !loginResponse.response) {
        return {
          error: "invalid credentails",
        };
      }

      const login = await bcrypt.compare(
        body.password,
        loginResponse.response.dataValues.password
      );

      if (!login) {
        return {
          error: "invalid credentails",
        };
      }

      delete loginResponse.response.dataValues.password;
      const token = jwt.sign(
        loginResponse.response.dataValues,
        config.jwt.secret,
        {
          expiresIn: "1h",
        }
      );

      const session = await sessionModel.getSessionByUserId(
        loginResponse.response.dataValues.userId
      );

      if (session) {
        await sessionModel.deleteSession(
          loginResponse.response.dataValues.userId
        );
      }

      const sessionId = uuidV4();
      const createdSession = await sessionModel.createSession(
        token,
        loginResponse.response.dataValues.userId,
        sessionId
      );

      if (!createdSession.response || createdSession.error) {
        return {
          error: "unable to login",
        };
      }
      return {
        response: createdSession.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
};
