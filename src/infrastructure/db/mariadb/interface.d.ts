export interface IEntity {
  id: number;
}

export interface IDatabase {
  init: () => Promise<void>;
  executeSelectQuery: (query: string, params: any[]) => Promise<T | T[]>;
  executeWriteQuery: (query: string, params: any[]) => Promise<T>;
}
