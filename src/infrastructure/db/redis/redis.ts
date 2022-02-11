import { injectable } from 'inversify';
import * as redis from 'redis';

export interface IRedisDB {
  init: () => Promise<void>;
  // setData: (key: string, value: any) => Promise<void>;
  // getData: (key: string) => Promise<void>;
}

@injectable()
export class RedisDB implements IRedisDB {
  private client: redis.RedisClientType<redis.RedisModules>;

  public init = async () => {
    this.client = redis.createClient({
      url: 'redis://localhost:6379',
    });
    await this.client.connect();
  };

  // public setData = async (key: string, value: any) => {
  //   // 5분
  //   const result = await this.client.set(key, value, { EX: 300 });
  //   console.log(result);
  // };

  // public getData = async (key: string) => {
  //   const value = await this.client.get(key);
  //   console.log(`value: ${value}`);
  // };
}
