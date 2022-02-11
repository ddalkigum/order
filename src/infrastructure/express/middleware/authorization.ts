import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { config } from '../../../config';

export const authorization = (request: Request, response: Response, next: NextFunction) => {
  // token: Bearer token
  const accessToken = request.headers.authorization;
  const parsedToken = accessToken.split(' ');

  if (parsedToken[0] !== 'Bearer') {
    throw new Error('Access token must be provide Bearer token');
  }

  const verifiedToken: any = jwt.verify(parsedToken[1], config.jwtSignKey);
  request.body.id = verifiedToken.id;
  next();
};
