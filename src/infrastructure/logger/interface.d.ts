export interface ILogger {
  init: () => boolean;
  debug: (msg: any, ...optionalParams: any[]) => void;
  http: (msg: any, ...optionalParams: any[]) => void;
  info: (msg: any, ...optionalParams: any[]) => void;
  warn: (msg: any, ...optionalParams: any[]) => void;
  error: (msg: any, ...optionalParams: any[]) => void;
}