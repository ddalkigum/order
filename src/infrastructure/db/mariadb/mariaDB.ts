import { inject, injectable } from 'inversify';
import { Connection, createConnection, getConnection } from 'typeorm';
import { TYPES } from '../../../types';
import { validateQuery } from '../../../util/validateQuery';
import { ILogger } from '../../logger/interface';
import { devConnectionOption } from './ormConfig';

interface IEntity {
  id: number | string;
}
interface IQueryParams {
  name: string;
  type: string;
}

interface IQuery {
  params: IQueryParams[],
  sql: string,
}

export interface IDatabase {
  init: () => Promise<void>;
  close: () => Promise<void>;
  executeSelectQuery: (query: IQuery, params: any[]) => Promise<any | any[]>;
  executeWriteQuery: (query: IQuery, params: any[]) => Promise<number>;
}

@injectable()
export default class MariaDB implements IDatabase {
  @inject(TYPES.Logger) private logger: ILogger;
  private connection?: Connection;

  public async init (): Promise<void> {
    this.connection = await createConnection(devConnectionOption)
    this.logger.info(`Maria database connected: ${this.connection.isConnected}`);
  }
  
  public async close (): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }

  public async executeSelectQuery <T extends IEntity>(query: any, params: any[]): Promise<T | any[]> {
    validateQuery(query, params);
    this.connection = getConnection();
    const result = this.connection.query(query.sql, params);
    return result ? result : [];
  }

  public async executeWriteQuery (query: IQuery, params: any[]): Promise<number> {
    validateQuery(query, params);
    this.connection = getConnection();
    const masterQueryRunner = this.connection.createQueryRunner('master');
    try {
      this.logger.debug(`Write... params: ${params}\nquery: ${query.sql}`)
      await masterQueryRunner.startTransaction()
      const result = await this.connection.query(query.sql, params);
      this.logger.debug(result);
      await masterQueryRunner.commitTransaction();
      return result.insertId;
    } catch (error) {
      await masterQueryRunner.rollbackTransaction();
    } finally {
      await masterQueryRunner.release();
    } 
  }
}