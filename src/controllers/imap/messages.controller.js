import MessagesService from '../../services/imap/messages.service.js';

/**
 * Searches messages in a given mailbox for the specified session ID.
 * Sends back a JSON response containing the list of matching messages.
 *
 * @async
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with message data.
 */
const searchMessages = async (req, res) => {
  const {
    sessionId,
    folder = 'INBOX',
    limit,
    offset,
    sentSince,
    sentBefore,
    from,
    to,
  } = req.query;

  const messages = await MessagesService.searchMessages({
    sessionId,
    folder,
    limit,
    offset,
    sentSince,
    sentBefore,
    from,
    to,
  });

  res.status(200).json(messages);
};

export default { searchMessages };
