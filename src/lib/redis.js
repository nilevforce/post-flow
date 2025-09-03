import Redis from 'ioredis';
import {
  REDIS_HOST,
  REDIS_PORT,
} from '../config/base.config.js';

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  db: 0,
});

export default redis;
