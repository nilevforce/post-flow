import { simpleParser } from 'mailparser';
import ClientService from './client.service.js';
import SessionService from './sessions.service.js';
import substractTime from '../../utils/substract-time.js';

const searchMessages = async ({
  sessionId,
  folder = 'INBOX',
  limit = 10,
  offset = 0,
  sentSince,
  sentBefore,
  from,
  to,
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
    const searchObj = {};
    if (sentSince) searchObj.sentSince = new Date(sentSince);
    if (!sentSince) searchObj.sentSince = substractTime({ months: 2 });
    if (sentBefore) searchObj.sentBefore = new Date(sentBefore);
    if (from) searchObj.from = from;
    if (to) searchObj.to = to;

    await client.mailboxOpen(folder);

    let uids = await client.search(searchObj);
    uids = uids.slice(offset, limit);

    const messages = await Promise.all(
      uids.map(async (uid) => {
        const foundMessage = await client.fetchOne(uid, {
          source: true,
          uid: true,
        });

        const parsed = await simpleParser(foundMessage.source);

        return {
          id: parsed.id,
          uid: foundMessage.uid,
          subject: parsed.subject,
          from: parsed.from?.value[0]?.address,
          to: parsed.to?.value?.map((addr) => addr.address) || [],
          textBody: parsed.text,
          htmlBody: parsed.html,
          attachments: parsed.attachments || [],
          receivedAt: parsed.date,
          folder,
        };
      }),
    );

    return messages;
  });
};

export default { searchMessages };
