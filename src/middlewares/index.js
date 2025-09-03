import errorHandler from './error-handler.middleware.js';
import validateRequest from './validate-request.middleware.js';
import requestLogger from './request-logger.middleware.js';
import corsMiddleware from './cors.middleware.js';
import jsonMiddleware from './json.middleware.js';
import notFoundMiddleware from './not-found.middleware.js';
import { generalLimiter, authLimiter } from './rate-limiter.middleware.js';

export default {
  cors: corsMiddleware,
  json: jsonMiddleware,
  notFound: notFoundMiddleware,
  validateRequest,
  requestLogger,
  errorHandler,
  generalLimiter,
  authLimiter,
};
