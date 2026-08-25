import app from './app';
import { connectToMongoDB } from './utils/connectToMongoDB';
import logger from './utils/logger';

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

export default app;
