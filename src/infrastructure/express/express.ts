import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { inject, injectable } from 'inversify';
import { generalErrorHandler } from '../../common/error/handler';
import { IHttpRouter } from '../../domain/user/interface';
import { TYPES } from '../../types';
import { IServer } from './interface';

// @ts-ignore
@injectable()
export default class ExpressServer implements IServer {
  @inject(TYPES.UserRouter) private userRouter: IHttpRouter;
  @inject(TYPES.StoreRouter) private storeRouter: IHttpRouter;

  private app = express();

  public set(): void {
    // middleware
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    // route init
    this.userRouter.init();
    this.storeRouter.init();

    this.app.use('/api/v1/user', this.userRouter.get());
    this.app.use('/api/v1/store', this.storeRouter.get());

    // not found error handle

    // error handler
    this.app.use(generalErrorHandler);
  }

  public start(port: number): void {
    this.app.listen(port);
  }
}
