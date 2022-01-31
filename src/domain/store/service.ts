import { inject, injectable } from 'inversify';
import MenuEntity from '../../infrastructure/db/mariaDB/entity/menu/menu';
import StoreEntity from '../../infrastructure/db/mariaDB/entity/store/store';
import { TYPES } from '../../types';
import { IStoreRepository } from './repository';

export interface IStoreData {
  menu: MenuEntity[];
}

export interface IStoreService {
  getStoreMenuList: (id: number) => Promise<MenuEntity[]>;
  getStoreDetailData: (id: number) => Promise<StoreEntity>;
}

@injectable()
export class StoreService implements IStoreService {
  @inject(TYPES.StoreRepository) private storeRepository: IStoreRepository;

  public getStoreMenuList = async (id: number) => {
    // get store, menu
    return await this.storeRepository.getStoreMenuList(id);
  };

  public getStoreDetailData = async (id: number) => {
    // 1. Get store detail data
    const storeFound = this.storeRepository.getStoreDetailData(id);
    // 2. Check store exist
    if (!storeFound) throw new Error('Store does not exist');
    // 3. return store data
    return storeFound;
  };
}
