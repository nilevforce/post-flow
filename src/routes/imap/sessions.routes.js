import express from 'express';
import middlewares from '../../middlewares/index.js';
import { sessionSchemas } from '../../schemas/index.js';
import SessionController from '../../controllers/imap/sessions.controller.js';

const router = express.Router();

router.post(
  '/',
  middlewares.validateRequest(sessionSchemas.createSessionSchema, 'body'),
  SessionController.createSession,
);

export default router;
