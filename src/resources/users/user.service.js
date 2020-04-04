const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getUserByID = async id => {
  const users = await usersRepo.getAll();
  return users.filter(u => id === u.id);
};

const createUser = async body => {
  const newUser = new User(body);
  const users = await usersRepo.getAll();
  users.push(newUser);
  return users;
};

const updateUser = async (id, body) => {
  const users = await usersRepo.getAll();
  return users.map(user => {
    if (id === user.id) {
      return {
        id,
        ...body
      };
    }
    return user;
  });
};

const deleteUser = async id => {
  const users = await usersRepo.getAll();
  const lengthUser = users.length;
  users.filter(user => id !== user.id);
  const lengthUpdate = users.length;
  console.log(lengthUser !== lengthUpdate);
  return lengthUser !== lengthUpdate;
};

module.exports = { getAll, getUserByID, createUser, updateUser, deleteUser };
