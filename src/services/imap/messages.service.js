import { simpleParser } from 'mailparser';
import ClientService from './client.service.js';
import SessionService from './sessions.service.js';
import substractTime from '../../utils/substract-time.js';

const searchMessages = async ({
  sessionId,
  folder = 'INBOX',
  limit = 10,
  offset = 0,
  since,
  before,
  from,
  to,
  uidStart,
} = {}) => {
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
    const isSent = folder === 'INBOX.Sent';
    const searchObj = {
      ...(uidStart && { uid: `${uidStart}:${uidStart + limit}` }),
      [isSent ? 'sentSince' : 'since']: since ? new Date(since) : substractTime({ months: 2 }),
      ...(before && { [isSent ? 'sentBefore' : 'before']: new Date(before) }),
      ...(from && { from }),
      ...(to && { to }),
    };

    await client.mailboxOpen(folder);

    const foundUids = await client.search(searchObj, { uid: true });
    const uids = foundUids.slice(offset, offset + limit);

    const messages = await Promise.all(
      uids.map(async (uid) => {
        const foundMessage = await client
          .fetchOne(
            uid,
            { source: true, uid: true },
            { uid: true },
          );

        const parsed = await simpleParser(foundMessage.source);

        return {
          id: parsed.id,
          uid: foundMessage.uid,
          subject: parsed.subject,
          from: parsed.from?.value[0]?.address,
          to: parsed.to?.value?.map((addr) => addr.address) || [],
          textBody: parsed.text,
          htmlBody: parsed.html,
          receivedAt: parsed.date,
          folder,
        };
      }),
    );

    return {
      data: messages,
      limit,
      offset,
      totalCount: messages.length,
    };
  });
};

export default { searchMessages };
