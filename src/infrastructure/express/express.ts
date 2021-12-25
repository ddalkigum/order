import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { inject, injectable } from 'inversify';
import { IHttpRouter } from '../../domain/router/user';
import { TYPES } from '../../types';
import { IServer } from './interface';

@injectable()
export default class ExpressServer implements IServer {
  @inject(TYPES.UserRouter) private userRouter: IHttpRouter;

  private app = express();

  public async start (port: number): Promise<void> {
    // middleware 
    this.app.use(helmet())
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));  

    // route init 
    this.userRouter.init();

    this.app.use('/api/v1/user', this.userRouter.get())

    // transport error 
    
    // error response - response error 
    this.app.use((error: any, request: Request, response: Response, next: NextFunction) => {
      response.status(error.statusCode).json({
        name: error.name,
        message: error.message
      })
    })
    this.app.listen(port)
  }
};
