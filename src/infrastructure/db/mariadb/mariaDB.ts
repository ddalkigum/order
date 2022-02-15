import { inject, injectable } from 'inversify';
import { Connection, createConnection, InsertResult, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ISearchStoreOption } from '../../../domain/store/service';
import { TYPES } from '../../../types';
import { IWinstonLogger } from '../../logger/interface';
import MenuEntity from './entity/menu/menu';
import StoreCategoryEntity from './entity/store/category';
import StoreEntity from './entity/store/store';
import UserEntity from './entity/user/user';
import { devConnectionOption } from './ormConfig';
import { getStoreQueryBySearch } from './query';

export type ColumnCondition<T> = {
  [K in keyof T]?: T[K];
};

export interface IEntity {
  id?: number;
}

export interface IDatabase {
  init: () => Promise<void>;
  close: () => Promise<void>;
  truncate: (table: string) => Promise<void>;
  useQuery: (query: string) => Promise<any[]>;
  getAllData: <T>(table: string) => Promise<T[]>;
  getDataById: <T extends IEntity>(table: string, id: number | string) => Promise<T>;
  getDataByColumn: <T extends IEntity>(table: string, column: any) => Promise<T>;
  getDataFromUserLocationSortByNearest: (table: string, location: string, options: ISearchStoreOption) => Promise<any>;
  getDataUsingInnerJoin: <T extends IEntity>(table1: string, table2: string, columnCondition: ColumnCondition<T>, selectColumn?: any[]) => Promise<any>;
  insert: <T extends IEntity>(table: string, row: T) => Promise<T>;
  insertWithoutId: <T extends IEntity>(table: string, row: Partial<T>) => Promise<T>;
  bulkInsert: <T extends IEntity>(table: string, rowList: T[]) => Promise<void>;
  insertLocation: (table: string, data: any) => Promise<any>;
  deleteDataById: (table: string, id: number | string) => Promise<void>;
  updateData: (table: string, id: number, data: any) => Promise<any>;
}

const getEntityByTableName = (table: string) => {
  switch (table) {
    case 'user':
      return UserEntity;
    case 'store':
      return StoreEntity;
    case 'menu':
      return MenuEntity;
    case 'store_category':
      return StoreCategoryEntity;
    default:
      return null;
  }
};

const convertGetDataColumnCondition = <T extends IEntity>(columnCondition: ColumnCondition<T>): ObjectLiteral => {
  const keys = Object.keys(columnCondition);
  return keys.reduce((accum: ObjectLiteral, key: string) => {
    accum = { ...accum, [key]: columnCondition[key] };
    return accum;
  }, {});
};

@injectable()
export class MariaDB implements IDatabase {
  @inject(TYPES.WinstonLogger) private logger: IWinstonLogger;
  private connection?: Connection;

  public async init(): Promise<void> {
    this.connection = await createConnection(devConnectionOption);
    this.logger.info(`Maria database connected: ${this.connection.isConnected}`);
  }

  public async close(): Promise<void> {
    if (this.connection) await this.connection.close();
  }

  public async truncate(table: string): Promise<void> {
    if (process.env.NODE_ENV === 'test') {
      await this.connection.query(`DELETE FROM ${table};`);
    }
  }

  public useQuery = async (query: string) => {
    return await this.connection.query(query);
  };

  public getAllData = async <T>(table: string) => {
    const EntityClass = getEntityByTableName(table);
    const result = await this.connection.createQueryBuilder<T>(EntityClass, table).getMany();
    return result;
  };

  public async getDataById<T extends IEntity>(table: string, id: number | string): Promise<T> {
    const EntityClass = getEntityByTableName(table);
    const result = await this.connection.createQueryBuilder<T>(EntityClass, table).where({ id }).getOne();
    return result;
  }

  public async getDataByColumn<T extends IEntity>(table: string, columnCondition: ColumnCondition<T>): Promise<T> {
    const EntityClass = getEntityByTableName(table);
    const objectLiteral = convertGetDataColumnCondition(columnCondition);
    const result = await this.connection.createQueryBuilder<T>(EntityClass, table).where(objectLiteral).getOne();
    return result;
  }

  public getDataFromUserLocationSortByNearest = async (table: string, location: string, options: ISearchStoreOption) => {
    try {
      const query = getStoreQueryBySearch(location, options);
      const result = await this.connection.query(query);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  public getDataUsingInnerJoin = async <T extends IEntity>(table1: string, table2: string, columnCondition: ColumnCondition<T>, selectColumn?: string[]) => {
    const queryRunner = this.connection.createQueryRunner();
    const EntityClass1 = getEntityByTableName(table1);
    const objectLiteral = convertGetDataColumnCondition(columnCondition);

    const result = await this.connection
      .createQueryBuilder<T>(EntityClass1, table1)
      .setQueryRunner(queryRunner)
      .select(selectColumn)
      .leftJoin(`${table1}.${table2}`, table2)
      .where(objectLiteral)
      .getMany();
    return result;
  };

  public async insert<T extends IEntity>(table: string, row: T): Promise<T> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const EntityClass = getEntityByTableName(table);
      await queryRunner.startTransaction();
      await this.connection.createQueryBuilder<T>(EntityClass, table).setQueryRunner(queryRunner).insert().into(EntityClass).values(row).execute();
      await queryRunner.commitTransaction();
      return row;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public insertLocation = async (table: string, data) => {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const EntityClass = getEntityByTableName(table);
      await queryRunner.startTransaction();
      const objectLiteral = convertGetDataColumnCondition(data);
      const location = () => {
        return `POINT(${data.longitude}, ${data.latitude})`;
      };

      await this.connection
        .createQueryBuilder<StoreEntity>(EntityClass, table)
        .setQueryRunner(queryRunner)
        .insert()
        .values({
          ...objectLiteral,
          location,
        })
        .execute();
      await queryRunner.commitTransaction();
      return data;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };

  public bulkInsert = async <T extends IEntity>(table: string, rowList: T[]) => {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const EntityClass = getEntityByTableName(table);
      await this.connection.createQueryBuilder(EntityClass, table).setQueryRunner(queryRunner).insert().values(rowList).execute();
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };

  public async insertWithoutId<T extends IEntity>(table: string, row: Partial<T>): Promise<T> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const EntityClass = getEntityByTableName(table);
      await queryRunner.startTransaction();
      const result: InsertResult = await this.connection.createQueryBuilder(EntityClass, table).setQueryRunner(queryRunner).insert().into(EntityClass).values(row).execute();
      await queryRunner.commitTransaction();
      return { ...{ id: result.identifiers[0].id, ...row } } as T;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async deleteDataById<T extends IEntity>(table: string, id: number | string): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const EntityClass = getEntityByTableName(table);
      await queryRunner.startTransaction();
      await this.connection.createQueryBuilder<T>(EntityClass, table).delete().from(EntityClass).where({ id }).execute();
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async updateData<T extends IEntity>(table: string, id: number, row: Partial<T>): Promise<Partial<T>> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const EntityClass = getEntityByTableName(table);
      await queryRunner.startTransaction();
      await this.connection
        .createQueryBuilder<T>(EntityClass, table)
        .update()
        .set(row as unknown as QueryDeepPartialEntity<T>)
        .where({ id })
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
