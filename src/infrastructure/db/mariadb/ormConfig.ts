import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { dbConfig } from './dbConfig';

const MARIA_DB = 'mariadb';
const { NODE_ENV } = process.env;
const TEST_DATABASE = 'orders_test';

export const devConnectionOption: ConnectionOptions = {
  type: MARIA_DB,
  database: NODE_ENV === 'test' ? TEST_DATABASE : dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  synchronize: true,
  entities: [path.join(__dirname, './entity/**/*.{ts,js}')],
  cli: {
    migrationsDir: 'migration',
  },
};

console.log(devConnectionOption);
