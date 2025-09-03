import logger from '../lib/logger.js';
import { ApiError, InternalServerError } from '../errors/api/index.js';
import getErrorMessage from '../utils/get-error-message.js';

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    logger.error(err.message, err.toJSON());
  } else {
    logger.error(err.message, {
      stack: err.stack,
    });
  }

  const processedError = err instanceof ApiError
    ? err
    : new InternalServerError();

  const { status, code, details } = processedError;
  const response = {
    error: {
      message: getErrorMessage(processedError),
      ...(code ? { code } : {}),
      ...(details?.length > 0 && { details }),
    },
  };

  res.status(status).json(response);
};

export default errorHandler;
