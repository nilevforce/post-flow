import Redis from 'ioredis';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} from '../config/base.config.js';

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
  db: 0,
});

export default redis;
