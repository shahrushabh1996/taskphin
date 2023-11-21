const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {
    JWT: {
        secretKey,
        validity
    }
} = require('../config')

const {
    bcrypt: {
        saltRound
    }
} = require('../config');
const { get } = require('./cache');

async function hash(value) {
  return bcrypt.hash(value, saltRound);
}

async function compare(plainValue, hashedValue) {
  return bcrypt.compare(plainValue, hashedValue);
}

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: validity });
}

function verifyToken(token) {
  token = removeBearer(token);

  try {
    if (get(convertToSmallHash(token))) return false;

    const data = jwt.verify(token, secretKey);

    const { exp: expiryTime } = data || {};
  
    if (_isTokenExpired(expiryTime)) return false;
  
    return data;
  } catch (err) {
    return false;
  }
}

function _isTokenExpired(expiryTime) {
  return expiryTime < (Date.now() / 1000);
}

function removeBearer(token) {
  const bearerPrefix = 'Bearer ';

  // Check if the token starts with 'Bearer ' (case-insensitive)
  if (token && token.startsWith(bearerPrefix)) {
    // Remove the 'Bearer ' prefix and return the token without the prefix
    return token.slice(bearerPrefix.length);
  }

  // If the token doesn't start with 'Bearer ', return it as is
  return token;
}

function convertToSmallHash(token) {
  return crypto.createHash('sha256').update(token).digest('base64');
}

module.exports = {
  hash,
  compare,
  generateToken,
  verifyToken,
  convertToSmallHash,
  removeBearer
};