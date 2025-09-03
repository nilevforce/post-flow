import {
  StatusCodes,
  ReasonPhrases,
} from 'http-status-codes';
import ApiError from './ApiError.js';
import ErrorCodes from '../../utils/error-codes.js';

class ServiceUnavailableError extends ApiError {
  /**
   * @param {Object} params
   * @param {number} [params.status] - Http status code
   * @param {string} [params.code] - Error code
   * @param {string} [params.message] - Error message
   * @param {any} [params.cause] - Original error
   */
  constructor({
    status = StatusCodes.SERVICE_UNAVAILABLE,
    code = ErrorCodes.SERVICE_UNAVAILABLE,
    message = ReasonPhrases.SERVICE_UNAVAILABLE,
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

export default ServiceUnavailableError;
