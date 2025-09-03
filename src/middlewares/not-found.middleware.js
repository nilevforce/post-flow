import { NotFoundError } from '../errors/api/index.js';

const notFoundMiddleware = (req, res, next) => {
  const notFound = new NotFoundError({ message: 'Route not found' });

  return next(notFound);
};

export default notFoundMiddleware;
