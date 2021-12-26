import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
interface SuccessResponse {
  status: string;
  result: any
}

export interface IApiResponse {
  generateResponse: (request: Request, response: Response, next: NextFunction, func: any) => Promise<SuccessResponse>
}

@injectable()
export class ApiResponse implements IApiResponse {
  public async generateResponse (_: Request, response: Response, next: NextFunction, func: any): Promise<any> {
    try {
      const result = await func();
      return response.status(200).json({
        status: 'Success',
        result
      });
    } catch (error) {
      next(error);
    }
  }
}