import { injectable } from 'inversify';
import winston, { Logger } from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';
import { isObject } from '../../util/typeCheck';
import { ILogger } from './interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const concatParams = (params: any[]): string => {
  return params.reduce((accum: string, param: unknown): string => {
    accum += isObject(param) ? JSON.stringify(param) : param;
    return accum;
  }, '');
};

@injectable()
export default class WinstonLogger implements ILogger {
  private logger: Logger;

  constructor() {
    this.init();
  }

  public init = (): boolean => {
    const { combine, timestamp, printf } = winston.format;
    const logDir = 'logs';

    const logFormat = printf(({ level, timestamp, message }) => {
      return `${timestamp} ${level}: ${message}`;
    });

    const debugFormat = printf(({ level, message }) => {
      return `${level}: ${message}`;
    });

    /*
     * Log levels
     * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
     */
    this.logger = winston.createLogger({
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      ),
      transports: [
        // http, info, warn, error level log
        new WinstonDaily({
          level: 'http',
          datePattern: 'YYYY-MM-DD',
          dirname: logDir, // log 파일은 /logs 하위에 저장
          filename: '%DATE%.log',
          maxFiles: 30, // 30-day logs
          zippedArchive: true,
        }),
        // error level log
        new WinstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: logDir + '/error', // error.log 파일은 /logs/error 하위에 저장
          filename: '%DATE%.error.log',
          maxFiles: 30, // 30-day logs
          zippedArchive: true,
        }),
      ],
    });

    // For development environment
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.colorize(), // 색깔 넣어서 출력
            debugFormat,
          ),
        }),
      );
    }

    this.logger.info('Logger initialized.');
    return true;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public debug = (msg: any, ...optionalParams: any[]): void => {
    msg = isObject(msg) ? JSON.stringify(msg) : '' + msg;
    if (optionalParams) {
      msg += concatParams(optionalParams);
    }
    this.logger.debug(msg);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public http = (msg: any, ...optionalParams: any[]): void => {
    msg = isObject(msg) ? JSON.stringify(msg) : '' + msg;
    if (optionalParams) {
      msg += concatParams(optionalParams);
    }
    this.logger.http(msg);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public info = (msg: any, ...optionalParams: any[]): void => {
    msg = isObject(msg) ? JSON.stringify(msg) : '' + msg;
    if (optionalParams) {
      msg += concatParams(optionalParams);
    }
    this.logger.info(msg);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public warn = (msg: any, ...optionalParams: any[]): void => {
    msg = isObject(msg) ? JSON.stringify(msg) : '' + msg;
    if (optionalParams) {
      msg += concatParams(optionalParams);
    }
    this.logger.warn(msg);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public error = (msg: any, ...optionalParams: any[]): void => {
    msg = isObject(msg) ? JSON.stringify(msg) : '' + msg;
    if (optionalParams) {
      msg += concatParams(optionalParams);
    }
    this.logger.error(msg);
  };
}
