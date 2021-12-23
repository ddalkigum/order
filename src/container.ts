import { Container } from 'inversify';
import 'reflect-metadata';
import { IDatabase } from './infrastructure/db/mariadb/interface';
import MariaDB from './infrastructure/db/mariadb/mariaDB';
import ExpressServer from './infrastructure/express/express';
import { IServer } from './infrastructure/express/interface';
import { ILogger } from './infrastructure/logger/interface';
import WinstonLogger from './infrastructure/logger/winston';
import { TYPES } from './types';

const container = new Container();
// logger container 
container.bind<ILogger>(TYPES.Logger).to(WinstonLogger).inSingletonScope();

// db container
container.bind<IDatabase>(TYPES.MariaDB).to(MariaDB).inSingletonScope();

// server container
container.bind<IServer>(TYPES.Server).to(ExpressServer).inSingletonScope();

export { container };
