import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import logger from '../../lib/logger.js';
import {
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
} from '../../errors/api/index.js';

class ImapService {
  constructor({ connection }) {
    const {
      host, port, username, password,
    } = connection;
    if (!host) throw new BadRequestError({ message: 'Host is required' });
    if (!port) throw new BadRequestError({ message: 'Port is required' });
    if (!username) throw new BadRequestError({ message: 'Username is required' });
    if (!password) throw new BadRequestError({ message: 'Password is required' });

    this.connection = {
      host, port, username, password,
    };
  }

  createClient() {
    const {
      host, port, username, password,
    } = this.connection;
    return new ImapFlow({
      host,
      port,
      secure: true,
      auth: { user: username, pass: password },
      logger: false,
    });
  }

  async connectClient(client) {
    try {
      const connection = await client.connect();
      console.log(connection);
    } catch (error) {
      logger.error(`IMAP connection error: ${error.message}`, { error });

      throw new UnauthorizedError({
        message: 'IMAP authorization error. Please check your auth data',
      });
    }
  }

  async disconnectClient(client) {
    try {
      await client.logout();
    } catch (error) {
      logger.error(`IMAP logout error: ${error.message}`, { error });
    }
  }

  async withClient(operation) {
    const client = this.createClient();
    try {
      await this.connectClient(client);
      return await operation(client);
    } catch (error) {
      console.log(error);
      logger.error(`IMAP operation error: ${error.message}`, { error });
      throw new InternalServerError();
    } finally {
      await this.disconnectClient(client);
    }
  }

  async searchMessages({ folder = 'INBOX', filters = {}, pagination = {} }) {
    const searchObj = {};
    if (filters.sentSince) searchObj.sentSince = new Date(filters.sentSince);
    if (filters.sentBefore) searchObj.sentBefore = new Date(filters.sentBefore);
    if (filters.from) searchObj.from = filters.from;
    if (filters.to) searchObj.to = filters.to;

    const { limit = 50 } = pagination;

    return this.withClient(async (client) => {
      await client.mailboxOpen(folder);

      let uids = await client.search(searchObj);
      uids = uids.slice(0, limit);

      const messages = await Promise.all(
        uids.map(async (uid) => {
          const foundMessage = await client.fetchOne(uid, {
            source: true,
            uid: true,
          });

          const parsed = await simpleParser(foundMessage.source);

          return {
            subject: parsed.subject,
            from: parsed.from?.value[0]?.address,
            to: parsed.to?.value[0]?.address,
            date: parsed.date,
            text: parsed.text,
            // html: parsed.html,
          };
        }),
      );
      return messages;
    });
  }

  async getListMailboxes() {
    return this.withClient(async (client) => {
      const mailboxes = await client.list();
      return mailboxes;
    });
  }
}

export default ImapService;
