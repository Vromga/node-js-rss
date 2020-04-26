const { verify } = require('jsonwebtoken');
const { createError } = require('./errorHandler');
const { JWT_SECRET_KEY } = require('./config');

const authModule = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw createError('Token not found', 401);
  }
  const token = authorization.split(' ')[1];
  verify(token, JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      res.status(401).json({ message: 'Incorrect token' });
    } else {
      req.userId = decoded.userId;
      req.login = decoded.login;
      // eslint-disable-next-line callback-return
      next();
    }
  });
};

module.exports = { authModule };
