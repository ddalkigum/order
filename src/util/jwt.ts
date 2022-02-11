import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateJWT = (payload: any): string => {
  return jwt.sign(payload, config.jwtSignKey);
};
