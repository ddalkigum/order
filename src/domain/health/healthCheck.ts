import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IApiResponse } from '../../common/api/interface';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { IHttpRouter } from '../user/interface';

// @ts-ignore
@injectable()
export class HealthCheckRouter implements IHttpRouter {
  @inject(TYPES.ApiResponse) private apiResponse: IApiResponse;
  @inject(TYPES.Logger) private logger: ILogger;

  private router = Router();

  public init = () => {
    this.router.get('/server', async (request: Request, response: Response, next: NextFunction) => {
      await this.apiResponse.generateResponse(request, response, next, async () => {
        return { message: 'Success' };
      });
    });
  };

  public get = () => {
    return this.router.bind(this);
  };
}
