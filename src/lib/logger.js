import winston from 'winston';
import { LOG_LEVEL } from '../config/base.config.js';

const logger = winston.createLogger({
  level: LOG_LEVEL || 'info',
  transports: [
    new winston.transports.File({
      filename: 'logs/app.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
    }),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
    }),

    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({
          timestamp, level, message, stack,
        }) => `[${timestamp}] ${level} ${stack || message}`),
      ),
    }),
  ],
});

export default logger;
