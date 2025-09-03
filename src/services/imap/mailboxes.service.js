import ClientService from './client.service.js';
import SessionService from './sessions.service.js';

const getMailboxes = async (sessionId) => {
  const {
    host,
    username,
    password,
  } = await SessionService.validateSession(sessionId);

  return ClientService.withClient({
    host,
    username,
    password,
  }, async (client) => {
    const mailboxes = await client.list();
    return mailboxes;
  });
};

export default { getMailboxes };
