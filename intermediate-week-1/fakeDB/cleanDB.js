const fakeDB = require('./FakeDB');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;


const DBPopulate = async () => {
  try {
    mongoose.connect(
      MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },

      async () => {
        console.log('Started populating DB');
        await fakeDB.populate();
        await mongoose.connection.close();
        console.log('DB has been populated');
      }
    );
  } catch (error) {
    logger.error('DB Connection not successful!', error);
  }
};

DBPopulate();
