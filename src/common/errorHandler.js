/* eslint-disable no-unused-vars */
const logger = require('./logger');

const catchError = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const createError = (message, status) => {
  const error = message instanceof Error ? message : new Error(message);
  error.status = status;
  return error;
};

const notFoundError = (req, res, next) => {
  const error = createError('Not found', 404);
  return next(error);
};

const handleErrors = (error, req, res, next) => {
  const message = `[status:] ${error.status ||
    500}, [message:] ${error.message || 'Internal Server Error'}`;

  logger.error(message);

  res.status(error.status || 500).json({ message: error.message });
};

module.exports = {
  catchError,
  notFoundError,
  handleErrors
};
