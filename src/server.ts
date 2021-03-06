import { container } from './container';
import { ILogger } from './infrastructure/logger/interface';
import { serverConfig } from './infrastructure/express/expressConfig';
import { IServer } from './infrastructure/express/interface';
import { TYPES } from './types';

const start = async (): Promise<void> => {
  const logger: ILogger = container.get(TYPES.Logger);

  const server: IServer = container.get(TYPES.Server);
  await server.start(serverConfig.port);

  logger.info(`Server on ${serverConfig.port}, environment: ${process.env.NODE_ENV}`);
};

start();
