import express from 'express';
import middlewares from '../../middlewares/index.js';
import { mailboxSchemas } from '../../schemas/index.js';
import MailboxesController from '../../controllers/imap/mailboxes.controller.js';

const router = express.Router();

router.get(
  '/',
  middlewares.validateRequest(mailboxSchemas.getMailboxesSchema, 'query'),
  MailboxesController.getMailboxes,
);

export default router;
