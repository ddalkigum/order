export interface IDatabase {
  init: (dbId: string, dbName: string) => Promise<boolean>;
}
