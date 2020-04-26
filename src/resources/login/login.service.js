const { compare } = require('bcryptjs');
const { createError } = require('../../common/errorHandler');
const { sign } = require('jsonwebtoken');
const { getByLogin } = require('../users/user.service');
const { JWT_SECRET_KEY } = require('../../common/config');

// eslint-disable-next-line no-shadow
const login = async (login, password) => {
  const user = await getByLogin(login);
  if (!user) {
    throw createError('User not found', 403);
  }
  const isValid = await compare(password, user.password);

  if (!isValid) {
    throw createError('Incorrect password', 403);
  }

  return sign(
    {
      userId: user._id,
      login: user.login
    },
    JWT_SECRET_KEY,
    {
      expiresIn: '15m'
    }
  );
};

module.exports = { login };
