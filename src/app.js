import express from 'express';
import cookieParser from 'cookie-parser';
import middlewares from './middlewares/index.js';
import imapSessionsRouter from './routes/imap/sessions.routes.js';
import imapMailboxesRouter from './routes/imap/mailboxes.routes.js';
import imapMessagesRouter from './routes/imap/messages.routes.js';

const app = express();

app.use(middlewares.generalLimiter);
app.use(middlewares.json);
app.use(middlewares.cors);
app.use(cookieParser());
app.use(middlewares.requestLogger);

app.use('/api/v1/imap/sessions', imapSessionsRouter);
app.use('/api/v1/imap/mailboxes', imapMailboxesRouter);
app.use('/api/v1/imap/messages', imapMessagesRouter);

app.get('/api/v1/status', (req, res) => res.json({ ok: true }));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
