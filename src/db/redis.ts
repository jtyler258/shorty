import { Tedis } from 'tedis'
import { REDIS_URL } from '../utils/config';

const tedis = new Tedis({
  host: REDIS_URL
});

export default class Redis {
  static async set(key: string, value: string, ttl: number = 604800): Promise<void> {
    return await tedis.setex(key, ttl, value)
  }

  static async get(key: string): Promise<string|number|null> {
    return await tedis.get(key);
  }
}