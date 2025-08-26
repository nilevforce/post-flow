import 'dotenv/config';

const {
  APP_PORT,
  LOG_LEVEL,
} = process.env;

if (!APP_PORT) throw new Error('The APP_PORT environment variable is not defined.');
if (!LOG_LEVEL) throw new Error('The LOG_LEVEL environment variable is not defined.');

export {
  APP_PORT,
  LOG_LEVEL,
};
