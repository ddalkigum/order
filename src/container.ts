import { Container } from 'inversify';
import 'reflect-metadata';
import { ApiResponse, IApiResponse } from './common/api/response';
import { IErrorGenerator, ErrorGenerator } from './common/error/errorGenerator';
import { UserRouter, IHttpRouter } from './domain/router/user';
import { IUserService, UserService } from './domain/service/user';
import { IDatabase } from './infrastructure/db/mariadb/interface';
import MariaDB from './infrastructure/db/mariadb/mariaDB';
import ExpressServer from './infrastructure/express/express';
import { IServer } from './infrastructure/express/interface';
import { ILogger } from './infrastructure/logger/interface';
import WinstonLogger from './infrastructure/logger/winston';
import { TYPES } from './types';

const container = new Container();
// common container 
container.bind<IApiResponse>(TYPES.ApiResponse).to(ApiResponse)
container.bind<IErrorGenerator>(TYPES.ErrorGenerator).to(ErrorGenerator).inSingletonScope();

// domain container 
container.bind<IHttpRouter>(TYPES.UserRouter).to(UserRouter).inSingletonScope();
container.bind<IUserService>(TYPES.UserService).to(UserService)

// infrastructure container
container.bind<ILogger>(TYPES.Logger).to(WinstonLogger).inSingletonScope();
container.bind<IServer>(TYPES.Server).to(ExpressServer).inSingletonScope();
container.bind<IDatabase>(TYPES.MariaDB).to(MariaDB).inSingletonScope();

export { container };
