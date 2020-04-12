const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');

const logDir = path.join(__dirname, '../', 'logs');
const filename = path.join(logDir, 'logs.log');
// eslint-disable-next-line no-shadow
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] [${timestamp}] -- ${message.toLowerCase()}`;
});

const loggerConfig = {
  exitOnError: false,
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console({ level: 'silly' }),
    new transports.File({
      level: 'info',
      filename
    })
  ]
};

const logger = createLogger(loggerConfig);

module.exports = logger;
