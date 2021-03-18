const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const router = require('./routes');
(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const app = express();

    app.use(express.json());
    app.use(helmet());
    app.use(router);

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (ex) {
    console.log('Error on start up: ', ex);
  }
})();
