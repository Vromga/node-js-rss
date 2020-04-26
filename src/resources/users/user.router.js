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
      const user = await usersService.createUser(req.body);
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
      const statusDelete = await usersService.deleteUserById(req.params.id);
      if (statusDelete) {
        res.status(200).send(JSON.stringify('user delete successfully'));
      } else {
        res.status(400).send(JSON.stringify('user delete failed'));
      }
    })
  )
  .put(
    catchError(async (req, res) => {
      const userToUpdate = {
        id: req.params.id,
        name: req.body.name,
        login: req.body.login
      };
      await usersService.updateUser(userToUpdate);
      await res.json({ message: 'User has been updated' });
    })
  );

module.exports = router;
