/**
 * Base class for application errors.
 */
class AppError extends Error {
  /**
   * @param {Object} params - Error parameters
   * @param {string} params.message - Error message
   * @param {any} [params.cause] - The original error that caused this error
   * @param {boolean} [params.isOperational] - Whether this is an operational error
   */
  constructor({
    message,
    cause = null,
    isOperational = true,
  } = {}) {
    super(message, { cause });

    this.name = this.constructor.name;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
