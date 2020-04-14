const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findOne({ _id: id });
};

const update = async userToUpdate => {
  // const idx = users.findIndex(user => user.id === id);
  // users[idx] = { ...users[idx], ...body };
  return User.updateOne({ _id: userToUpdate.id }, userToUpdate);
};

const create = async user => {
  return User.create(user);
};

const deleteById = async id => {
  return (await User.deleteOne({ _id: id })).ok;
};

module.exports = {
  getAllUsers: getAll,
  createUser: create,
  getUserById: getById,
  deleteUserById: deleteById,
  updateUserById: update
};
