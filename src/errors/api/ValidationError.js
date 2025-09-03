import { StatusCodes } from 'http-status-codes';
import ApiError from './ApiError.js';
import ErrorCodes from '../../utils/error-codes.js';

class ValidationError extends ApiError {
  /**
   * @param {Object} params
   * @param {number} [params.status] - Http status code
   * @param {string} [params.code] - Error code
   * @param {string} [params.message] - Error message
   * @param {any} [params.cause] - Original error
   * @param {Array} [params.details] - Additional error details
   */
  constructor({
    status = StatusCodes.BAD_REQUEST,
    code = ErrorCodes.VALIDATION_ERROR,
    message = 'Invalid input data',
    details = [],
  } = {}) {
    super({
      status,
      code,
      message,
      details,
    });
  }
}

export default ValidationError;
