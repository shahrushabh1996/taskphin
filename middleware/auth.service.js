const { verifyToken } = require('../utils/auth');

function verifyAuthToken(token = '') {
  try {

    if (token === '') return false;
    
    const userData = verifyToken(token);

    if(!userData) return false;

    return userData;
  } catch (err) {
    console.error('Error Verifying Auth Token:', err);
    throw new Error(err);
  }
}

module.exports = {
  verifyAuthToken
}