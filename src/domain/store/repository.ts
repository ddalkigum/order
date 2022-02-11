import { inject, injectable } from 'inversify';
import MenuEntity from '../../infrastructure/db/mariaDB/entity/menu/menu';
import StoreEntity from '../../infrastructure/db/mariaDB/entity/store/store';
import { IDatabase } from '../../infrastructure/db/mariaDB/mariaDB';
import { TYPES } from '../../types';
import { ISearchStoreOption, IUpdateStoreRequest } from './service';

export const STORE_TABLE = 'store';
export const MENU_TABLE = 'menu';

export interface IStoreRepository {
  getStoreMenuList: (id: number) => Promise<MenuEntity>;
  getStoreDetailData: (id: number) => Promise<StoreEntity>;
  insert: (data: any) => Promise<any>;
  getRetrievedDataFromUserLocation: (location: any, options: ISearchStoreOption) => Promise<any>;
  deleteStore: (id: number) => Promise<void>;
  update: (id: number, data: IUpdateStoreRequest) => Promise<any>;
}

//
@injectable()
export class StoreRepository implements IStoreRepository {
  @inject(TYPES.MariaDB) private db: IDatabase;

  public getStoreMenuList = async (id: number) => {
    return await this.db.getDataUsingInnerJoin<MenuEntity>(STORE_TABLE, MENU_TABLE, { id });
  };

  public getStoreDetailData = async (id: number) => {
    return await this.db.getDataById<StoreEntity>(STORE_TABLE, id);
  };

  public insert = async (data: any) => {
    return await this.db.insertLocation(STORE_TABLE, data);
  };

  public getRetrievedDataFromUserLocation = async (location: string, options: ISearchStoreOption) => {
    return await this.db.getDataFromUserLocationSortByNearest(STORE_TABLE, location, options);
  };

  public deleteStore = async (id: number) => {
    return await this.db.deleteDataById(STORE_TABLE, id);
  };

  public update = async (id: number, data: IUpdateStoreRequest) => {
    return await this.db.updateData(STORE_TABLE, id, data);
  };
}
