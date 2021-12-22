import { ConnectionOptions } from 'typeorm';
import { dbConfig } from './dbConfig';

const MARIA_DB = 'mariadb'

export const devConnectionOption: ConnectionOptions = {
  ...dbConfig,
  type: MARIA_DB,
  synchronize: false,
  entities: ['/src/infrastructure/db/mariadb/entity/**/*.ts']
};
