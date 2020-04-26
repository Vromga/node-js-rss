const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: false
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.dropDatabase();
  User.insertMany([
    { name: 'user', login: 'USER', password: 'PacmanColorHouseApple' },
    { name: 'user2', login: 'USER2', password: 'PacmanColorHouseApple' }
  ]);
  Board.insertMany([{ title: 'Product name: Bread', columns: [] }]);
  Task.insertMany([
    {
      title: 'Title: Hello world',
      order: 88,
      description: 'Clean windows',
      userId: '2c205504-6446-47cc-9281-c368f6257622',
      boardId: '8b39987b-1aa9-431d-b627-02f1a83f1442',
      columnId: '2be0c342-ec0b-422d-84c2-212d89393fee'
    }
  ]);
  db.once('open', () => {
    console.log('we are connected!');
    cb();
  });
};

module.exports = connectToDB;
