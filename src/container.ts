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
import { IMorgan, Morgan } from './infrastructure/logger/morgan';
import { HealthCheckRouter } from './domain/health/healthCheck';
import { IAWSS3, AWSS3 } from './infrastructure/aws/s3/s3';

const container = new Container();
// Infrastructure
container.bind<ILogger>(TYPES.Logger).to(WinstonLogger).inSingletonScope();
container.bind<IDatabase>(TYPES.MariaDB).to(MariaDB).inSingletonScope();
container.bind<IServer>(TYPES.Server).to(ExpressServer).inSingletonScope();
container.bind<IMorgan>(TYPES.MorganLogger).to(Morgan).inSingletonScope();
container.bind<IAWSS3>(TYPES.AWSS3).to(AWSS3).inSingletonScope();

// Common container
container.bind<IApiResponse>(TYPES.ApiResponse).to(ApiResponse).inSingletonScope();

// Health check container
container.bind<IHttpRouter>(TYPES.HealthCheckRouter).to(HealthCheckRouter).inSingletonScope();

// User container
container.bind<IHttpRouter>(TYPES.UserRouter).to(UserRouter).inSingletonScope();
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

export { container };
