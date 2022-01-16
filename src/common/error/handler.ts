import { NextFunction, Request, Response } from "express";

export const generalErrorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  const { statusCode, name, message } = error;
  console.log(error);
  response.status(statusCode || 500).json({
    name,
    message,
  });
}