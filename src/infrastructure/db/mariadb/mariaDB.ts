import { inject, injectable } from 'inversify';
import { Connection, createConnection } from 'typeorm';
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

  public async executeSelectQuery <T extends IEntity>(query: string, params: any[]): Promise<T> {
    return 
  }

  public async executeWriteQuery <T extends IEntity>(query: string, params: any[]): Promise<any> {
    return 
  }
}