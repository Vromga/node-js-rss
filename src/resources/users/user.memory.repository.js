const userDB = require('../db/userrDB');
const getAll = async () => {
  return userDB.userDB;
};

module.exports = { getAll };
