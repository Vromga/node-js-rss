let users = [
  {
    id: '9147d88a-75b6-4f4b-9071-c50cf1965b31',
    name: 'user',
    login: 'USER',
    password: 'PacmanColorHouseApple'
  }
];

const getAll = async () => {
  return users;
};

const getById = async id => {
  return users.find(user => user.id === id);
};

const update = async (id, body) => {
  const idx = users.findIndex(user => user.id === id);
  users[idx] = { ...users[idx], ...body };
};

const create = async user => {
  users.push(user);
};

const deleteById = async id => {
  users = users.filter(user => user.id !== id);
};

module.exports = {
  getAllUsers: getAll,
  createUser: create,
  getUserById: getById,
  deleteUserById: deleteById,
  updateUserById: update
};
