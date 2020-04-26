const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const logger = require('./common/logger');
const { handleErrors, notFoundError } = require('./common/errorHandler');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const parser = require('./common/parser');
const { authModule } = require('./common/auth');
const loginRouter = require('./resources/login/login.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('server started...');
    return;
  }
  next();
});

app.use((req, res, next) => {
  const str = parser(req.url, req.query, req.body);
  logger.info(str);
  next();
});

app.use('/users', authModule, userRouter);
app.use('/boards', authModule, boardRouter);
app.use('/boards/:boardId/tasks', authModule, taskRouter);
app.use('/login', loginRouter);

app.use(notFoundError);
app.use(handleErrors);

process.on('uncaughtException', error => {
  const message = `[message:] Error captured: ${error.message}`;
  logger.error(message);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  const message = `[message:] Unhandled rejection detected: ${reason.message}`;
  logger.error(message);
});

module.exports = app;
