const app = require('./app');
const connectToMongoDB = require('./utils/connectToMongoDB');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  await connectToMongoDB();
  app.listen(PORT, () => {
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${PORT} 🛡️
      ################################################
      SERVER IN ${process.env.NODE_ENV} MODE
    `);
  });
};

startServer();

module.exports = app;
