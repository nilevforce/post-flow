import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import { TooManyRequestsError } from '../errors/api/index.js';

// General limiter
const generalLimiter = rateLimit({
  windowMs: 1000, // 1 second
  limit: 5,
  handler: () => {
    throw new TooManyRequestsError({
      message: 'Too many requests, please try again later.',
    });
  },
  standardHeaders: true,
  keyGenerator: (req) => req.user?.id || ipKeyGenerator(req.ip),

});

// Strict limit for authentication
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 10,
  handler: () => {
    throw new TooManyRequestsError({
      message: 'Too many login attempts, please try again after 5 minutes.',
    });
  },
  standardHeaders: true,
  keyGenerator: (req) => req.body?.email || ipKeyGenerator(req.ip),
});

export {
  generalLimiter,
  authLimiter,
};
