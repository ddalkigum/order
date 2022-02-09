import 'reflect-metadata';
import { Container } from 'inversify';
import { IApiResponse } from './common/api/interface';
import ApiResponse from './common/api/response';
import UserRouter from './domain/user/router';
import { MariaDB, IDatabase } from './infrastructure/db/mariaDB/mariaDB';
import ExpressServer from './infrastructure/express/express';
import { IServer } from './infrastructure/express/interface';
import { ILogger } from './infrastructure/logger/interface';
import WinstonLogger from './infrastructure/logger/winston';
import { TYPES } from './types';
import { IMorganLogger, MorganLogger } from './infrastructure/logger/morgan';
import { StoreRouter } from './domain/store/router';
import { IStoreService, StoreService } from './domain/store/service';
import { IStoreRepository, StoreRepository } from './domain/store/repository';
import { IHttpRouter } from './domain/interface';
import { UserService } from './domain/user/service';
import { UserRepository } from './domain/user/repository';

const container = new Container({ defaultScope: 'Singleton' });
// Infrastructure
container.bind<ILogger>(TYPES.Logger).to(WinstonLogger);
container.bind<IDatabase>(TYPES.MariaDB).to(MariaDB);
container.bind<IServer>(TYPES.Server).to(ExpressServer);
container.bind<IMorganLogger>(TYPES.MorganLogger).to(MorganLogger);

// Common container
container.bind<IApiResponse>(TYPES.ApiResponse).to(ApiResponse);

// User container
container.bind<IHttpRouter>(TYPES.UserRouter).to(UserRouter);
container.bind(TYPES.UserService).to(UserService);
container.bind(TYPES.UserRepository).to(UserRepository);

// Store container
container.bind<IHttpRouter>(TYPES.StoreRouter).to(StoreRouter);
container.bind<IStoreService>(TYPES.StoreService).to(StoreService);
container.bind<IStoreRepository>(TYPES.StoreRepository).to(StoreRepository);

export { container };
