import { ISearchStoreOption } from '../../../domain/store/service';
import { ColumnCondition } from './mariaDB';

export interface IEntity {
  id: number;
}

export interface IDatabase {
  init: () => Promise<void>;
  close: () => Promise<void>;
  truncate: (table: string) => Promise<void>;
  getDataById: <T extends IEntity>(table: string, id: number | string) => Promise<T>;
  getDataByColumn: <T extends IEntity>(table: string, column: any) => Promise<T>;
  getDataFromUserLocationSortByNearest: (table: string, location: string, options: ISearchStoreOption) => Promise<any>;
  getDataUsingInnerJoin: <T extends IEntity>(table1: string, table2: string, columnCondition: ColumnCondition) => Promise<T>;
  insert: <T extends IEntity>(table: string, row: T) => Promise<T>;
  insertWithoutId: <T extends IEntity>(table: string, row: Omit<T, 'id'>) => Promise<T>;
  insertLocation: (table: string, data: any) => Promise<any>;
  deleteDataById: (table: string, id: number | string) => Promise<void>;
  updateData: (table: string, id: number, data: any) => Promise<Partial<T>>;
}
