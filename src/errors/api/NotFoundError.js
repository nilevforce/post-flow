import {
  StatusCodes,
  ReasonPhrases,
} from 'http-status-codes';
import ApiError from './ApiError.js';
import ErrorCodes from '../../utils/error-codes.js';

class NotFoundError extends ApiError {
  /**
   * @param {Object} params
   * @param {number} [params.status] - Http status code
   * @param {string} [params.code] - Error code
   * @param {string} [params.message] - Error message
   * @param {any} [params.cause] - Original error
   */
  constructor({
    status = StatusCodes.NOT_FOUND,
    code = ErrorCodes.NOT_FOUND,
    message = ReasonPhrases.NOT_FOUND,
    cause = null,
  } = {}) {
    super({
      status,
      code,
      message,
      cause,
    });
  }
}

export default NotFoundError;
