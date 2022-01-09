import { inject, injectable } from 'inversify';
import { Connection, createConnection, EntityTarget } from 'typeorm';
import { TYPES } from '../../../types';
import { ILogger } from '../../logger/interface';
import { IDatabase } from './interface';
import { devConnectionOption } from './ormConfig';

const { NODE_ENV } = process.env;

@injectable()
export default class MariaDB implements IDatabase {
  @inject(TYPES.Logger) private logger: ILogger;
  private connection?: Connection;

  public async init (): Promise<void> {
    this.connection = await createConnection(devConnectionOption)
    this.logger.info(`Maria database connected: ${this.connection.isConnected}`);
  }

  public async close (): Promise<void> {
    if (this.connection) await this.connection.close();
  }

  public async executeSelectListQuery (sql: string, params: any[]): Promise<any[]> {
    return []
  }

  public async executeSelectQuery () {

  }

  public async executeWriteQuery () {

  }
}
