import dotenv from 'dotenv';

const { NODE_ENV } = process.env;
let envFound

if (NODE_ENV === 'production') {
  envFound = dotenv.config({ path: '.env' });
} else if (NODE_ENV === 'development') {
  envFound = dotenv.config({ path: '.env.development' });
} else {
  envFound = dotenv.config({ path: '.env.local' });
}

if (!envFound || envFound.error) {
  throw new Error(`Couldn't find ${envFound} file`);
}
