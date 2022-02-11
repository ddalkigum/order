import './config';
import { container } from './container';
import { IWinstonLogger } from './infrastructure/logger/interface';
import { serverConfig } from './infrastructure/express/expressConfig';
import { IServer } from './infrastructure/express/interface';
import { TYPES } from './types';
import { IDatabase } from './infrastructure/db/mariaDB/mariaDB';
import { IRedisDB } from './infrastructure/db/redis/redis';

const start = async (): Promise<void> => {
  const logger: IWinstonLogger = container.get(TYPES.WinstonLogger);

  const db: IDatabase = container.get(TYPES.MariaDB);
  await db.init();

  const redis: IRedisDB = container.get(TYPES.RedisDB);
  await redis.init();

  const server: IServer = container.get(TYPES.Server);
  server.set();
  server.start(serverConfig.port);

  logger.info(`Server on ${serverConfig.port}, environment: ${process.env.NODE_ENV}`);
};

start();
