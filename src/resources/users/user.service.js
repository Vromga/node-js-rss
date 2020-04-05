const usersRepo = require('./user.memory.repository');

const getAllUsers = () => usersRepo.getAllUsers();
const createUser = user => usersRepo.createUser(user);
const getUserById = id => usersRepo.getUserById(id);
const updateUser = (id, body) => usersRepo.updateUserById(id, body);
const deleteUserById = id => usersRepo.deleteUserById(id);

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUserById
};
