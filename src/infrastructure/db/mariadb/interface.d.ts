export interface IEntity {
  id: number;
}

export interface IDatabase {
  init: () => Promise<void>;
  close: () => Promise<void>;
  truncate: (table: string) => Promise<void>;
  getDataById: <T extends IEntity>(table: string, id: number | string) => Promise<T>;
  getDataByColumn: <T extends IEntity>(table: string, column: any) => Promise<T>;
  getDataListByColumn: <T extends IEntity>(table: string, column: any) => Promise<T[]>;
  getAllData: (table: string) => Promise<T>;
  insert: <T extends IEntity>(table: string, row: T) => Promise<T>;
  insertWithoutId: <T extends IEntity>(table: string, row: Omit<T, 'id'>) => Promise<T>;
  deleteDataById: (table: string, id: number | string) => Promise<void>;
  deleteDataByColumn: (table: string, column: any) => Promise<void>;
  updateData: (table: string, data: any) => Promise<Partial<T>>;
}
