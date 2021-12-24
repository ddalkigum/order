const DEFAULT_PORT = 3306;
const DEFAULT_CONNECTION_LIMIT = 5;
const DEFAULT_MARIA_DB_USERNAME = 'root';
const DEFAULT_MARIA_DB_PASSWORD = '1234';
const DEFAULT_MARIA_DB_HOST = 'localhost';
const DEFAULT_MARIA_DB_DATABASE = 'order';

export interface MariaDBGeneralConfig {
  username: string;
  password: string;
  connectionLimit: number;
  host: string;
  port: number;
  database: string;
}

export const dbConfig: MariaDBGeneralConfig = {
  username: process.env.DEV_MARIA_DB_USERNAME || DEFAULT_MARIA_DB_USERNAME,
  password: process.env.DEV_MARIA_DB_PASSWORD || DEFAULT_MARIA_DB_PASSWORD,
  connectionLimit: parseInt(process.env.DEV_MARIA_DB_CONNECTION_LIMIT) | DEFAULT_CONNECTION_LIMIT,
  host: process.env.DEV_MARIA_DB_HOST || DEFAULT_MARIA_DB_HOST,
  port: parseInt(process.env.DEV_MARIA_DB_PORT) || DEFAULT_PORT,
  database: process.env.DEV_MARIA_DB_DATABASE || DEFAULT_MARIA_DB_DATABASE,
}