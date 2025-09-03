import redis from '../../lib/redis.js';

class CacheService {
  constructor() {
    this.client = redis;
  }

  // General
  async get(key) {
    return this.client.get(key);
  }

  async getAllKeys() {
    return this.client.keys('*');
  }

  async set(key, value, ttl = null) {
    if (ttl) {
      return this.client.setex(key, ttl, value);
    }
    return this.client.set(key, value);
  }

  async del(key) {
    return this.client.del(key);
  }

  async exists(key) {
    return this.client.exists(key);
  }

  // Cache
  async cache(key, value, ttl = 300) {
    return this.set(`cache:${key}`, JSON.stringify(value), ttl);
  }

  async getCache(key) {
    const data = await this.get(`cache:${key}`);
    return data ? JSON.parse(data) : null;
  }

  // IMAP sessions
  async setImapSession(sessionId, data, ttl = 3600) {
    return this.set(`imap:session:${sessionId}`, JSON.stringify(data), ttl);
  }

  async getImapSession(sessionId) {
    const data = await this.get(`imap:session:${sessionId}`);
    return data ? JSON.parse(data) : null;
  }

  async deleteImapSession(sessionId) {
    return this.del(`imap:session:${sessionId}`);
  }
}

export default new CacheService(redis);
