import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { IApiResponse } from './interface';

@injectable()
export default class ApiResponse implements IApiResponse {
  public async generateResponse (_: Request, response: Response, next: NextFunction, func: any): Promise<any> {
    try {
      const result = await func();
      response.status(200).json({
        status: 'Success',
        result
      });
    } catch (error) {
      next(error);
    }
  }
}