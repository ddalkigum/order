import './config';
import { container } from './container';
import { ILogger } from './infrastructure/logger/interface';
import { serverConfig } from './infrastructure/express/expressConfig';
import { IServer } from './infrastructure/express/interface';
import { TYPES } from './types';
import { IDatabase } from './infrastructure/db/mariadb/interface';
import { IAWSS3 } from './infrastructure/aws/s3/s3';

const start = async (): Promise<void> => {
  const logger: ILogger = container.get(TYPES.Logger);

  const db: IDatabase = container.get(TYPES.MariaDB);
  await db.init();

  const s3: IAWSS3 = container.get(TYPES.AWSS3);
  s3.upload();

  const server: IServer = container.get(TYPES.Server);
  server.set();
  server.start(serverConfig.port);

  logger.info(`Server on ${serverConfig.port}, environment: ${process.env.NODE_ENV}`);
};

start();
