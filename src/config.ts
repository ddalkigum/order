import dotenv from 'dotenv';

const path: string = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';
const envFound = dotenv.config({ path });

if (!envFound || envFound.error) {
  throw new Error(`Couldn't find ${path} file`);
}
