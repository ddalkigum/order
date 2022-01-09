import dotenv from 'dotenv';

const path: string = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';
console.log(`path: ${path}`)
const envFound = dotenv.config({ path });

console.log(envFound);

if (!envFound || envFound.error) {
  throw new Error(`Couldn't find ${path} file`);
}
