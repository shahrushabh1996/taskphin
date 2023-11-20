const { ValidationError } = require('sequelize');
const { plainRow, isUniqueKeyViolation } = require("../utils/sequelize")
const auth = require('./schema/auth.schema');

async function createUser(data) {
  try {
    const newUser = await auth.create(data);
    return plainRow(newUser);
  } catch(err) {
    console.error('Error creating user:', err);

    if (err instanceof ValidationError) throw err;

    throw new Error(err);
  }
}

async function getUser(where) {
  try {
    const user = await auth.findOne({ where, raw: true, nest: true });
    return user;
  } catch(err) {
    console.error('Error getting user:', err);
    throw new Error(err);
  }
}

module.exports = {
    createUser,
    getUser
};