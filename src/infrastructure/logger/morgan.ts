import { Handler } from 'express';
import { inject, injectable } from 'inversify';
import morgan, { StreamOptions } from 'morgan';
import { TYPES } from '../../types';
import { IWinstonLogger } from './interface';

export interface IMorganLogger {
  init: () => Handler;
}

@injectable()
export class MorganLogger implements IMorganLogger {
  @inject(TYPES.WinstonLogger) private logger: IWinstonLogger;

  stream: StreamOptions = {
    write: (message) => this.logger.http(message),
  };

  public init = () => {
    return morgan(':method :url :status :res[content-length] - :response-time ms', { stream: this.stream });
  };
}
