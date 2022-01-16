import { inject, injectable } from 'inversify';
import { Connection, createConnection, InsertResult, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { TYPES } from '../../../types';
import { ILogger } from '../../logger/interface';
import OrderEntity from './entity/orders';
import UserEntity from './entity/users';
import { IDatabase, IEntity } from './interface';
import { devConnectionOption } from './ormConfig';

const getEntityByTableName = (table: string) => {
  switch(table) {
    case 'users':
      return UserEntity
    case 'orders':
      return OrderEntity
    default:
      return null;
  }
}

export type ColumnCondition<T> = {
  [K in keyof T]?: T[K] 
}

const convertGetDataColumnCondition = <T extends IEntity>(columnCondition: ColumnCondition<T>): ObjectLiteral => {
  const keys = Object.keys(columnCondition);
  return keys.reduce((accum: ObjectLiteral, key: string) => {
    accum = { ...accum, [key]: columnCondition[key]}
    return accum
  }, {})
}

// @ts-ignore
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

  public async truncate (table: string): Promise<void> {
    if (process.env.NODE_ENV === 'test') {
      await this.connection.query(`TRUNCATE TABLE ${table}`);
    }
  }

  public async getDataById <T extends IEntity>(table: string, id: number | string): Promise<T> {
    try {
      const EntityClass = getEntityByTableName(table);
      const result = await this.connection.createQueryBuilder<T>(EntityClass, table)
        .where({ id })
        .getOne();
      return result;
    } finally {
      // await this.connection
    }
  }

  public async getDataByColumn <T extends IEntity>(table: string, columnCondition: ColumnCondition<T>): Promise<T> {
    try {
      const EntityClass = getEntityByTableName(table);
      const objectLiteral = convertGetDataColumnCondition(columnCondition);
      this.logger.debug(`objectLiteral: ${JSON.stringify(objectLiteral)}`);
      const result = await this.connection.createQueryBuilder<T>(EntityClass, table)
        .where(objectLiteral)
        .getOne();
      return result;
    } finally {
      // await this.close();
    }
  }

  public async insert <T extends IEntity>(table: string, row: T): Promise<T> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const EntityClass = getEntityByTableName(table);
      await queryRunner.startTransaction();
      await this.connection.createQueryBuilder<T>(EntityClass, table).setQueryRunner(queryRunner)
        .insert()
        .into(EntityClass)
        .values(row)
        .execute();
      await queryRunner.commitTransaction();
      return row;
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async insertWithoutId <T extends IEntity>(table: string, row: Omit<T, 'id'>): Promise<T> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const EntityClass = getEntityByTableName(table);
      await queryRunner.startTransaction();
      const result: InsertResult = await this.connection.createQueryBuilder(EntityClass, table).setQueryRunner(queryRunner)
        .insert()
        .into(EntityClass)
        .values(row)
        .execute();
      await queryRunner.commitTransaction();
      return { ...{ id: result.identifiers[0].id, ...row }} as T;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async deleteDataById <T extends IEntity>(table: string, id: number | string): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const EntityClass = getEntityByTableName(table);
      await queryRunner.startTransaction();
      await this.connection.createQueryBuilder<T>(EntityClass, table)
        .delete()
        .from(EntityClass)
        .where({ id })
        .execute();
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error;
    } finally {
      await queryRunner.release()
    }
  }

  public async updateData <T extends IEntity>(table: string, row: Partial<T>): Promise<Partial<T>> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const EntityClass = getEntityByTableName(table);
      await queryRunner.startTransaction();
      await this.connection.createQueryBuilder<T>(EntityClass, table)
        .update()
        .set(row as unknown as QueryDeepPartialEntity<T>)
        .where({ id: row.id })
        .execute();
      await queryRunner.commitTransaction();
      return row;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}