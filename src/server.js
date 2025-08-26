import { APP_PORT } from './config/base.config.js';
import app from './app.js';
import logger from './lib/logger.js';

process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});

const startServer = async () => {
  try {
    app.listen(APP_PORT, () => {
      logger.info(`App is listening on PORT: ${APP_PORT}`);
    });
  } catch (error) {
    logger.error(`Error starting app: ${error}`);
    process.exit(1);
  }
};

startServer();
