import dotenv from 'dotenv';

const path: string = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';
const envFound = dotenv.config({ path });

export const config = {
  baseURL: process.env.BASE_URL || 'http://localhost:3000'
}

if (!envFound || envFound.error) {
  throw new Error(`Couldn't find ${path} file`);
}
