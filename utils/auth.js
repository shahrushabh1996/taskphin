const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  token = _removeBearer(token);

  try {
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

function _removeBearer(token) {
  const bearerPrefix = 'Bearer ';

  // Check if the token starts with 'Bearer ' (case-insensitive)
  if (token && token.startsWith(bearerPrefix)) {
    // Remove the 'Bearer ' prefix and return the token without the prefix
    return token.slice(bearerPrefix.length);
  }

  // If the token doesn't start with 'Bearer ', return it as is
  return token;
}

module.exports = {
    hash,
    compare,
    generateToken,
    verifyToken
};

// (async () => {
//     const token = generateToken({
//         name: "Rushabh Shah"
//     });
//     console.log(token);
//     console.log(verifyToken(token));
// })()