const { verifyAuthToken: verifyAuthTokenService } = require('./auth.service');
const { INVALID_TOKEN } = require('./message.json')

async function verifyAuthToken(req, res, next) {
  try {
    const { authorization } = req.headers;

    const userData = verifyAuthTokenService(authorization);

    if (!userData) return res.status(403).send({ message: INVALID_TOKEN});

    req.headers.userData = userData;

    next();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  verifyAuthToken
}