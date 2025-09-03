import { createId } from '@paralleldrive/cuid2';
import CacheService from '../cache/cache.service.js';
import {
  UnauthorizedError,
} from '../../errors/api/index.js';

const createSession = async ({
  host, username, password,
}) => {
  const id = createId();
  const expiresIn = 60;

  await CacheService.setImapSession(id, {
    host, username, password,
  }, expiresIn);

  return { id, expiresIn };
};

const getSessionById = async (id) => {
  const session = await CacheService.getImapSession(id);
  return session;
};

const validateSession = async (id) => {
  const session = await getSessionById(id);

  if (!session) throw new UnauthorizedError();

  return session;
};

export default {
  createSession,
  getSessionById,
  validateSession,
};
