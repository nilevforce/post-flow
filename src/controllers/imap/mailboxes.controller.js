import MailboxesService from '../../services/imap/mailboxes.service.js';

/**
 * Gets mailboxes information for a given session ID.
 * Sends back a JSON response containing mailbox data.
 *
 * @async
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response.
 */
const getMailboxes = async (req, res) => {
  const { sessionId } = req.query;
  const mailboxes = await MailboxesService.getMailboxes(sessionId);
  res.status(200).json(mailboxes);
};

export default { getMailboxes };
