import { Container } from 'inversify';
import 'reflect-metadata';
import ExpressServer from './infrastructure/express/express';
import { IServer } from './infrastructure/express/interface';
import { ILogger } from './infrastructure/logger/interface';
import WinstonLogger from './infrastructure/logger/winston';
import { TYPES } from './types';

const container = new Container();
container.bind<ILogger>(TYPES.Logger).to(WinstonLogger).inSingletonScope();

container.bind<IServer>(TYPES.Server).to(ExpressServer).inSingletonScope();

export { container };
