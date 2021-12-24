import { inject, injectable } from 'inversify';
import { Connection, createConnection, getConnection } from 'typeorm';
import { TYPES } from '../../../types';
import { ILogger } from '../../logger/interface';
import { IDatabase, IEntity } from './interface';
import { devConnectionOption } from './ormConfig';

@injectable()
export default class MariaDB implements IDatabase {
  @inject(TYPES.Logger) private logger: ILogger;
  private connection?: Connection;

  public async init (): Promise<void> {
    this.connection = await createConnection(devConnectionOption)
    this.logger.info(`Maria database connected: ${this.connection.isConnected}`);
  }

  public async executeSelectQuery <T extends IEntity>(query: string, params: any[]): Promise<T | []> {
    try {
      const result = await this.connection.query(query, params);
      return result ? result : [];
    } finally {
      await this.connection.close();
    }
  }

  public async executeWriteQuery (query: string, params: any[]): Promise<void> {
    const masterQueryRunner = this.connection.createQueryRunner('master');
    try {
      this.logger.debug(`Write... params: ${params}\nquery: ${query}`)
      await masterQueryRunner.startTransaction()
      await this.connection.query(query, params);
      await masterQueryRunner.commitTransaction();
    } catch (error) {
      await masterQueryRunner.rollbackTransaction();
    } finally {
      await masterQueryRunner.release();
    } 
  }
}