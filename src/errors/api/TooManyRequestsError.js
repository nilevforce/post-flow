import {
  StatusCodes,
  ReasonPhrases,
} from 'http-status-codes';
import ApiError from './ApiError.js';
import ErrorCodes from '../../utils/error-codes.js';

class TooManyRequestsError extends ApiError {
  /**
   * @param {Object} params
   * @param {number} [params.status] - Http status code
   * @param {string} [params.code] - Error code
   * @param {string} [params.message] - Error message
   * @param {any} [params.cause] - Original error
   */
  constructor({
    status = StatusCodes.TOO_MANY_REQUESTS,
    code = ErrorCodes.TOO_MANY_REQUESTS,
    message = ReasonPhrases.TOO_MANY_REQUESTS,
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

export default TooManyRequestsError;
