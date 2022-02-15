import 'reflect-metadata';
import { Container } from 'inversify';
import { IApiResponse } from './common/api/interface';
import ApiResponse from './common/api/response';
import UserRouter from './domain/user/router';
import { MariaDB, IDatabase } from './infrastructure/db/mariaDB/mariaDB';
import ExpressServer from './infrastructure/express/express';
import { IServer } from './infrastructure/express/interface';
import { IWinstonLogger } from './infrastructure/logger/interface';
import { WinstonLogger } from './infrastructure/logger/winston';
import { TYPES } from './types';
import { IMorganLogger, MorganLogger } from './infrastructure/logger/morgan';
import { StoreRouter } from './domain/store/router';
import { IStoreService, StoreService } from './domain/store/service';
import { IStoreRepository, StoreRepository } from './domain/store/repository';
import { IHttpRouter } from './domain/interface';
import { IUserService, UserService } from './domain/user/service';
import { IUserRepository, UserRepository } from './domain/user/repository';
import { IKakaoSercvice, KakaoService } from './infrastructure/social/kakao';
import { IRedisDB, RedisDB } from './infrastructure/db/redis/redis';
import { ISeed, Seed } from './seed/seed';
import { DevRouter } from './domain/dev/devRouter';

const container = new Container({ defaultScope: 'Singleton' });
// Infrastructure
container.bind<IWinstonLogger>(TYPES.WinstonLogger).to(WinstonLogger);
container.bind<IDatabase>(TYPES.MariaDB).to(MariaDB);
container.bind<IServer>(TYPES.Server).to(ExpressServer);
container.bind<IMorganLogger>(TYPES.MorganLogger).to(MorganLogger);
container.bind<IKakaoSercvice>(TYPES.KakaoService).to(KakaoService);
container.bind<IRedisDB>(TYPES.RedisDB).to(RedisDB);

// Common container
container.bind<IApiResponse>(TYPES.ApiResponse).to(ApiResponse);

// User container
container.bind<IHttpRouter>(TYPES.UserRouter).to(UserRouter);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

// Store container
container.bind<IHttpRouter>(TYPES.StoreRouter).to(StoreRouter);
container.bind<IStoreService>(TYPES.StoreService).to(StoreService);
container.bind<IStoreRepository>(TYPES.StoreRepository).to(StoreRepository);

// Dev seed container
container.bind<IHttpRouter>(TYPES.DevRouter).to(DevRouter);
container.bind<ISeed>(TYPES.Seed).to(Seed);

export { container };
