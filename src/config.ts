import dotenv from 'dotenv';

const { NODE_ENV } = process.env;

const getPath = (NODE_ENV) => {
  switch (NODE_ENV) {
    case 'production':
      return '.env';
    case 'development':
      return '.env.dev';
    default:
      return '.env.local';
  }
};
const path = getPath(NODE_ENV);

const envFound = dotenv.config({ path });

export const config = {
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  jwtSignKey: process.env.SECRET_KEY || 'order',
};

if (!envFound || envFound.error) {
  throw new Error(`Couldn't find ${path} file`);
}
