import { Handler } from 'express';
import { inject, injectable } from 'inversify';
import morgan, { StreamOptions } from 'morgan';
import { TYPES } from '../../types';
import { ILogger } from './interface';

export interface IMorganLogger {
  init: () => Handler;
}

// @ts-ignore
@injectable()
export class MorganLogger implements IMorganLogger {
  @inject(TYPES.Logger) private logger: ILogger;

  stream: StreamOptions = {
    write: (message) => this.logger.http(message),
  };

  public init = () => {
    return morgan('combined', { stream: this.stream });
  };
}
