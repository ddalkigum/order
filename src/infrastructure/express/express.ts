import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { inject, injectable } from 'inversify';
import { generalErrorHandler } from '../../common/error/handler';
import { IHttpRouter } from '../../domain/interface';
import { TYPES } from '../../types';
import { IServer } from './interface';
import { IMorganLogger } from '../logger/morgan';

@injectable()
export default class ExpressServer implements IServer {
  @inject(TYPES.MorganLogger) private morganLogger: IMorganLogger;
  @inject(TYPES.UserRouter) private userRouter: IHttpRouter;
  @inject(TYPES.StoreRouter) private storeRouter: IHttpRouter;
  @inject(TYPES.DevRouter) private devRouter: IHttpRouter;

  private app = express();

  public set(): void {
    // middleware
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(this.morganLogger.init());

    // route init
    this.userRouter.init();
    this.storeRouter.init();
    this.devRouter.init();

    this.app.use('/api/v1/user', this.userRouter.get());
    this.app.use('/api/v1/store', this.storeRouter.get());
    this.app.use('/api/v1/dev', this.devRouter.get());

    // not found error handle

    // error handler
    this.app.use(generalErrorHandler);
  }

  public start(port: number): void {
    this.app.listen(port);
  }
}
