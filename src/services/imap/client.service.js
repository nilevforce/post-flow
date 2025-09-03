import { ImapFlow } from 'imapflow';
import logger from '../../lib/logger.js';
import {
  UnauthorizedError,
  InternalServerError,
  BadRequestError,
} from '../../errors/api/index.js';
import BaseError from '../../errors/BaseError.js';

const createClient = ({
  host,
  username,
  password,
}) => {
  if (!host || !username || !password) {
    throw new BadRequestError('Host, username and password are required');
  }

  return new ImapFlow({
    host,
    port: 993,
    secure: true,
    auth: {
      user: username,
      pass: password,
    },
    logger: false,
  });
};

const connect = async (client) => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
    logger.error(`IMAP connection error: ${error.message}`, { error });

    throw new UnauthorizedError({
      message: 'IMAP authorization error. Please check your auth data',
    });
  }
};

const disconnect = async (client) => {
  try {
    await client.logout();
  } catch (error) {
    logger.error(`IMAP logout error: ${error.message}`, { error });

    throw new InternalServerError({
      message: 'An error occurred during the logout process from the IMAP',
    });
  }
};

const withClient = async (connection, operation) => {
  const client = createClient(connection);
  try {
    await connect(client);

    return await operation(client);
  } catch (error) {
    logger.error(`IMAP operation error: ${error.message}`, { error });

    if (error instanceof BaseError) throw error;

    throw new InternalServerError({
      message: 'An error occurred during the IMAP operation',
    });
  } finally {
    await disconnect(client);
  }
};

export default {
  withClient,
};
