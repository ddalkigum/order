const DEFAULT_ERROR_NAME = {
  400: 'Bad Request',
  401: 'Unauthorizaed',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Duplicate',
  500: 'Internal Server Error',
}

interface IErrorStatus extends Error {
  statusCode: number;
}

export interface IErrorGenerator {
  generate: (message: string, statusCode: ErrorStatusCode) => void;
}

type ErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 500

export class ErrorGenerator implements IErrorGenerator {
  public generate (message: string, statusCode: ErrorStatusCode = 500): void {
    const error = new Error(message) as IErrorStatus;
    error.name = DEFAULT_ERROR_NAME[statusCode];
    error.statusCode = statusCode;
    throw error;
  }
}