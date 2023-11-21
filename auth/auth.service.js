const { ValidationError } = require('sequelize');
const auth = require('./auth.repository');
const { isValidEmail } = require("../utils/validation");
const { hash, compare, generateToken, verifyToken, convertToSmallHash, removeBearer } = require("../utils/auth");
const { set } = require("../utils/cache");
const { isUniqueKeyViolation } = require('../utils/sequelize');
const {
  AUTH_USER_CREATED,
  AUTH_USER_NOT_FOUND,
  AUTH_INVALID_CREDENTIALS,
  AUTH_LOGGED_IN,
  AUTH_LOGGED_OUT,
  AUTH_FAILED_USER_CREATEION,
  AUTH_FAILED_LOGOUT,
  EMAIL_REGISTERED,
  INVALID_EMAIL_ADDRESS
} = require('./message.json');

async function register(data) {
  try {
    const { password, email } = data || {};

    if (!isValidEmail(email)) return {
      code: 400,
      message: INVALID_EMAIL_ADDRESS
    }

    const user = await auth.createUser({ ...data, password: await hash(password) });

    if (!user) throw new Error(AUTH_FAILED_USER_CREATEION);

    return {
      code: 201,
      message: AUTH_USER_CREATED,
      data: user
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      const isEmailUniqueError = isUniqueKeyViolation(err, 'email');

      if (isEmailUniqueError) return {
        code: 409,
        message: EMAIL_REGISTERED
      }
    }
    console.error('Error Registering User:', err);
    throw new Error(err);
  }
}

async function login(email, password) {
  try {
    const user = await auth.getUser({ email: email });

    if (!user) return {
      code: 404,
      message: AUTH_USER_NOT_FOUND
    }

    const { password: storedPassword, ...restUserData } = user;

    const isValidPassword = await compare(password, storedPassword);

    if (!isValidPassword) return {
      code: 401,
      message: AUTH_INVALID_CREDENTIALS
    }

    return {
      code: 200,
      message: AUTH_LOGGED_IN,
      data: {
        token: generateToken(restUserData)
      }
    }
  } catch (err) {
    console.error('Error Logging User:', err);
    throw new Error(err);
  }
}

async function logout(token) {
  try {
    const tokenData = verifyToken(token);

    if (!tokenData) throw new Error(AUTH_FAILED_LOGOUT);

    const { exp } = tokenData || {};

    if (set(convertToSmallHash(removeBearer(token)), 1, exp)) {
      return {
        code: 200,
        message: AUTH_LOGGED_OUT
      }
    }

    throw new Error(AUTH_FAILED_LOGOUT);
  } catch (err) {
    console.error('Error Logging Out User:', err);
    throw new Error(err);
  }
}

module.exports = {
  register,
  login,
  logout
};