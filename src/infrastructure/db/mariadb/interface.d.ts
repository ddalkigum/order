export interface IEntity {
  id: number;
}

export interface IDatabase {
  init: () => Promise<boolean>;
  executeSelectQuery: (query: string, params: any[]) => Promise<T | T[]>;
  executeWriteQuery: (query: string, params: any[]) => Promise<T>;
}
