import express from 'express';
import middlewares from '../../middlewares/index.js';
import { messageSchemas } from '../../schemas/index.js';
import MessagesController from '../../controllers/imap/messages.controller.js';

const router = express.Router();

router.get(
  '/',
  middlewares.validateRequest(messageSchemas.searchMessagesSchema, 'query'),
  MessagesController.searchMessages,
);

export default router;
