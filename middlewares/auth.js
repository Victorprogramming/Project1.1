const config = require('../config/config.js');
const jwt = require('jsonwebtoken');
const { authCookieName, authHeaderName, jwtSecret } = config;
const userModel = require('../models/user.js');

module.exports = (req, res, next) => {
  const token = req.cookies[authCookieName] || req.headers[authHeaderName];
  if (!token) {
    next();
    return;
  }

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      next(err);
      return;
    }

    const user = await userModel.findById(decoded.userId).populate('expenses').lean();

    req.user = user;
    next();
  });
};
