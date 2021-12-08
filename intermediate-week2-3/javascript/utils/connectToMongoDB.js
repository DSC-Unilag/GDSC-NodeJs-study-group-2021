const mongoose = require('mongoose');
const logger = require('./logger');

const MONGO_URL = process.env.MONGO_URL;

module.exports = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('DB Connection Successful!');
  } catch (err) {
    logger.error('DB Connection not successful!', err);
    //process.exit(1);
  }
};
