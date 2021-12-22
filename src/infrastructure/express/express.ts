import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { injectable } from 'inversify';
import { IServer } from './interface';

@injectable()
export default class ExpressServer implements IServer {
  private app = express();

  public async start (port: number): Promise<void> {
    // middleware 
    this.app.use(helmet)
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));  

    // route init 

    // not found error handle

    // error handler

    this.app.listen(port)
  }
}