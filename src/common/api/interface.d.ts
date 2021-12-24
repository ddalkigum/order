import { NextFunction, Request, Response } from 'express';

interface SuccessResponse {
  status: string;
  result: any
}

export interface IApiResponse {
  generateResponse: (request: Request, response: Response, next: NextFunction, func: any) => Promise<SuccessResponse>
}