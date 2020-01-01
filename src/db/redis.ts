import { Tedis } from 'tedis'
import { REDIS_URL, REDIS_TTL } from '../utils/config';

const tedis = new Tedis({
  host: REDIS_URL
});

const TTL = Number.parseInt(REDIS_TTL);

export default class Redis {
  static async set(key: string, value: string): Promise<void> {
    return await tedis.setex(key, TTL, value)
  }

  static async get(key: string): Promise<string|number|null> {
    return await tedis.get(key);
  }
}