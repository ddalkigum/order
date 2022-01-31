import { inject, injectable } from 'inversify';
import MenuEntity from '../../infrastructure/db/mariaDB/entity/menu/menu';
import StoreEntity from '../../infrastructure/db/mariaDB/entity/store/store';
import { IDatabase } from '../../infrastructure/db/mariadb/interface';
import { TYPES } from '../../types';

export const STORE_TABLE = 'store';
export const MENU_TABLE = 'menu';

export interface IStoreRepository {
  getStoreMenuList: (id: number) => Promise<MenuEntity[]>;
  getStoreDetailData: (id: number) => Promise<StoreEntity>;
}

@injectable()
export class StoreRepository implements IStoreRepository {
  @inject(TYPES.MariaDB) private db: IDatabase;

  public getStoreMenuList = async (id: number) => {
    return this.db.getDataUsingInnerJoin<MenuEntity>(MENU_TABLE, STORE_TABLE, { id });
  };

  public getStoreDetailData = async (id: number) => {
    return this.db.getDataById<StoreEntity>(STORE_TABLE, id);
  };
}
