import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { dbConfig } from './dbConfig';

const MARIA_DB = 'mariadb';
const { NODE_ENV } = process.env;

export const devConnectionOption: ConnectionOptions = {
  ...dbConfig,
  type: MARIA_DB,
  synchronize: NODE_ENV === 'test' ? true : false,
  logger: 'simple-console',
  logging: true,
  entities: [path.join(__dirname, './entity/**/*.{ts,js}')],
  cli: {
    migrationsDir: 'migration',
  },
};
