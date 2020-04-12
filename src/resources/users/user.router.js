const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');
const { catchError } = require('../../common/errorHandler');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const users = await usersService.getAllUsers();
      await res.status(200).json(users.map(User.toResponse));
    })
  )
  .post(
    catchError(async (req, res) => {
      const user = new User(req.body);
      await usersService.createUser(user);
      await res.status(200).json(User.toResponse(user));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const user = await usersService.getUserById(req.params.id);
      await res.json(User.toResponse(user));
    })
  )
  .delete(
    catchError(async (req, res) => {
      await tasksService.updateByUserId(req.params.id);
      await usersService.deleteUserById(req.params.id);
      await res.json({ message: 'User has been deleted' });
    })
  )
  .put(
    catchError(async (req, res) => {
      await usersService.updateUser(req.params.id, req.body);
      await res.json({ message: 'User has been updated' });
    })
  );

module.exports = router;
