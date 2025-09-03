import 'dotenv/config';

const {
  APP_PORT,
  LOG_LEVEL,
  REDIS_HOST,
  REDIS_PORT,
} = process.env;

if (!APP_PORT) throw new Error('The APP_PORT environment variable is not defined.');
if (!LOG_LEVEL) throw new Error('The LOG_LEVEL environment variable is not defined.');
if (!REDIS_HOST) throw new Error('The REDIS_HOST environment variable is not defined.');
if (!REDIS_PORT) throw new Error('The REDIS_PORT environment variable is not defined.');

export {
  APP_PORT,
  LOG_LEVEL,
  REDIS_HOST,
  REDIS_PORT,
};
