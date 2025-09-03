/**
 * Extracts a human-readable error message from various error types.
 *
 * @param {unknown} error - The error object, string, or any value to extract the message from.
 * @returns {string} The extracted error message, or a default message if not found.
 */
const getErrorMessage = (error) => {
  if (error instanceof Error) {
    return error.message;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

export default getErrorMessage;
