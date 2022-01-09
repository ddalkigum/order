export interface IEntity {
  id: number;
}

export interface IDatabase {
  init: () => Promise<void>;
  close: () => Promise<void>;
  executeSelectListQuery: (sql: string, params: any[]) => Promise<T[]>
  executeSelectQuery: (sql: string, params: any[]) => Promise<T>
  executeWriteQuery: (sql: string, params: any[]) => Promise<T>
}


