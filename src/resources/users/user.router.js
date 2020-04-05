const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAllUsers();
    await res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = new User(req.body);
    await usersService.createUser(user);
    await res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getUserById(req.params.id);
    await res.json(User.toResponse(user));
  })
  .delete(async (req, res) => {
    await tasksService.updateByUserId(req.params.id);
    await usersService.deleteUserById(req.params.id);
    await res.json({ message: 'User has been deleted' });
  })
  .put(async (req, res) => {
    await usersService.updateUser(req.params.id, req.body);
    await res.json({ message: 'User has been updated' });
  });

module.exports = router;
