import { Container } from 'inversify';
import 'reflect-metadata';
import { IApiResponse } from './common/api/interface';
import ApiResponse from './common/api/response';
import { IHttpRouter } from './domain/user/interface';
import UserRouter from './domain/user/router';
import { IUserService, UserService } from './domain/user/service';
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

// router container 
container.bind<IHttpRouter>(TYPES.UserRouter).to(UserRouter).inSingletonScope();

// server container
container.bind<IServer>(TYPES.Server).to(ExpressServer).inSingletonScope();

// common container 
container.bind<IApiResponse>(TYPES.ApiResponse).to(ApiResponse).inSingletonScope();

// service container 
container.bind<IUserService>(TYPES.UserService).to(UserService)

export { container };
