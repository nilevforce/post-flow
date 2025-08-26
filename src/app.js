import express from 'express';
import middlewares from './middlewares/index.js';

const app = express();

app.use(middlewares.requestLogger);

app.get('/', (req, res) => {
  res.send('Hello World');
});

export default app;
