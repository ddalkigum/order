import { Handler } from 'express';
import { inject, injectable } from 'inversify';
import morgan, { StreamOptions } from 'morgan';
import { TYPES } from '../../types';
import { ILogger } from './interface';

export interface IMorgan {
  skip: () => boolean;
  get: () => Handler;
}

// @ts-ignore
@injectable()
export class Morgan implements IMorgan {
  @inject(TYPES.Logger) private logger: ILogger;

  stream: StreamOptions = {
    // Use the http severity
    write: (message) => this.logger.http(message),
  };

  public skip = () => {
    // const env = process.env.NODE_ENV || 'development';
    return false;
  };

  public get = () => {
    return morgan('dev', { stream: this.stream });
  };
}
