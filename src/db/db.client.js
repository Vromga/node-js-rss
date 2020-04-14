const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.dropDatabase();
  User.insertMany([
    { name: 'user', login: 'USER', password: 'PacmanColorHouseApple' },
    { name: 'user2', login: 'USER2', password: 'PacmanColorHouseApple' }
  ]);
  db.once('open', () => {
    console.log('we are connected!');
    cb();
  });
};

module.exports = connectToDB;
