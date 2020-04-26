const { PORT } = require('./common/config');
const app = require('./app');
const connectToDB = require('./db/db.client');

function initServer() {
  try {
    connectToDB(() => {
      app.listen(PORT, () =>
        console.log(`App is running on http://localhost:${PORT}`)
      );
    });
  } catch (e) {
    console.log(e);
  }
}

initServer();
