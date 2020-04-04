const router = require('express').Router();
const usersService = require('./user.service');
const User = require('./user.model');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  await res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await usersService.getUserByID(id);
  res.status(200).json(user.map(User.toResponse));
});

router.post('/', async (req, res) => {
  const users = await usersService.createUser(req.body);
  res.status(200).json(users.map(User.toResponse));
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const users = await usersService.updateUser(id, req.body);
  res
    .status(200)
    .json(users.map(User.toResponse))
    .end('The user has been updated.');
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const status = await usersService.deleteUser(id);
  if (!status) {
    res.status(204).end('The user has been deleted');
  } else {
    res.status(404).end('User not found');
  }
});

module.exports = router;
