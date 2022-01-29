import dotenv from 'dotenv';

const { NODE_ENV } = process.env;
const getEnvVariable = (): string => {
  if (NODE_ENV === 'production') {
    return '.env';
  }
  if (NODE_ENV === 'development') {
    return '.env.dev';
  }
  return '.env.local';
};

const path = getEnvVariable();

const envFound = dotenv.config({ path });

export const config = {
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
};

if (!envFound || envFound.error) {
  throw new Error(`Couldn't find ${path} file`);
}
