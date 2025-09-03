import SessionService from '../../services/imap/sessions.service.js';

/**
 * Creates a new IMAP session and stores it in Redis.
 * Sends back a JSON response containing the generated session ID.
 *
 * @async
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response.
 */
const createSession = async (req, res) => {
  const { host, username, password } = req.body;
  const data = await SessionService.createSession({ host, username, password });
  res.status(200).json(data);
};

export default { createSession };
