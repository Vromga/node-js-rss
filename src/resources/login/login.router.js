const router = require('express').Router();
const { catchError } = require('../../common/errorHandler');
const { login } = require('./login.service');

router.route('/').post(
  // eslint-disable-next-line no-unused-vars
  catchError(async (req, res, next) => {
    const token = await login(req.body.login, req.body.password);
    res.status(200).json({ token });
  })
);

module.exports = router;
