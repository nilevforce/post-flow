import {
  StatusCodes,
  ReasonPhrases,
} from 'http-status-codes';
import BaseError from '../BaseError.js';
import ErrorCodes from '../../utils/error-codes.js';

/**
 * Base class for API errors
 */
class ApiError extends BaseError {
  /**
   * @param {Object} params - Error parameters
   * @param {number} [params.status] - HTTP status code
   * @param {string} [params.code] - Error code
   * @param {string} [params.message] - Error message
   * @param {any} [params.cause] - Original error that caused this error
   * @param {boolean} [params.isOperational] - Whether this is an operational error
   * @param {Array} [params.details] - Additional error details
   */
  constructor({
    status,
    code,
    message,
    cause = null,
    isOperational = true,
    details = [],
  } = {}) {
    super({
      message: message || ReasonPhrases.SERVICE_UNAVAILABLE,
      cause,
      isOperational,
    });

    this.status = status || StatusCodes.SERVICE_UNAVAILABLE;
    this.code = code || ErrorCodes.SERVICE_UNAVAILABLE;
    this.details = details;
  }

  /**
   * Converts the error to a JSON object
   * @returns {Object} JSON representation of the error
   */
  toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

export default ApiError;
