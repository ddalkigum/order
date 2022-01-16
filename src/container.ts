import 'reflect-metadata';
import { Container } from 'inversify';
import { IApiResponse } from './common/api/interface';
import ApiResponse from './common/api/response';
import { IHttpRouter, IUserRepository, IUserService } from './domain/user/interface';
import UserRouter from './domain/user/router';
import { UserService } from './domain/user/service';
import { IDatabase } from './infrastructure/db/mariadb/interface';
import MariaDB from './infrastructure/db/mariadb/mariaDB';
import ExpressServer from './infrastructure/express/express';
import { IServer } from './infrastructure/express/interface';
import { ILogger } from './infrastructure/logger/interface';
import WinstonLogger from './infrastructure/logger/winston';
import { TYPES } from './types';
import UserRepository from './domain/user/repository';

const container = new Container();
// Infrastructure
container.bind<ILogger>(TYPES.Logger).to(WinstonLogger).inSingletonScope();
container.bind<IDatabase>(TYPES.MariaDB).to(MariaDB).inSingletonScope();
container.bind<IServer>(TYPES.Server).to(ExpressServer).inSingletonScope();

// Common container 
container.bind<IApiResponse>(TYPES.ApiResponse).to(ApiResponse).inSingletonScope();

// User container
container.bind<IHttpRouter>(TYPES.UserRouter).to(UserRouter).inSingletonScope();
container.bind<IUserService>(TYPES.UserService).to(UserService)
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)

export { container };
