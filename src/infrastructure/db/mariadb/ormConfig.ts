import { ConnectionOptions } from 'typeorm';
import { dbConfig } from './dbConfig';

const MARIA_DB = 'mariadb'

export const devConnectionOption: ConnectionOptions = {
  ...dbConfig,
  type: MARIA_DB,
  synchronize: process.env.NODE_ENV === 'local',
  entities: ['src/infrastructure/db/mariadb/entity/**.ts'],
  migrations: ['migration/*.{.ts,.js}'],
  cli: {
    'migrationsDir': 'migration',
  }
};
