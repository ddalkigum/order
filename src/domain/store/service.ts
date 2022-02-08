import { inject, injectable } from 'inversify';
import MenuEntity from '../../infrastructure/db/mariaDB/entity/menu/menu';
import StoreEntity from '../../infrastructure/db/mariaDB/entity/store/store';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { convertEntityToCamelFormat, convertLocationToPointType } from '../../util/convert';
import { getPaginationByPage, parsingLocation } from '../../util/request';
import { IStoreRepository } from './repository';

export interface IStoreData {
  menu: MenuEntity[];
}

export interface IInputData {
  search: string;
}

export interface ISearchStoreOption {
  search?: string;
  limit?: number;
  offset?: number;
  page?: number;
}

export interface IUpdateStoreRequest {
  name?: string;
  description?: string;
  store_phone_number?: string;
  package_available?: number;
  min_order_price?: number;
  address?: string;
  longitude?: number;
  latitude?: number;
}

export interface IStoreService {
  getStoreMenuList: (id: number) => Promise<MenuEntity>;
  getStoreDetailData: (id: number) => Promise<StoreEntity>;
  getRetrievedDataFromUserLocation: (location: string, options: ISearchStoreOption) => Promise<any>;
  insertStoreData: () => Promise<any>;
  deleteStoreData: (id: number) => Promise<any>;
  updateStoreData: (id: number, data: IUpdateStoreRequest) => Promise<StoreEntity>;
}

// @ts-ignore
@injectable()
export class StoreService implements IStoreService {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.StoreRepository) private storeRepository: IStoreRepository;

  public getStoreMenuList = async (id: number) => {
    const result = await this.storeRepository.getStoreMenuList(id);
    const r = convertEntityToCamelFormat(result[0]);
    console.log(r);
    return result;
  };

  public getStoreDetailData = async (id: number) => {
    // 1. Get store detail data
    const storeFound = this.storeRepository.getStoreDetailData(id);

    // 2. Check store exist
    if (!storeFound) throw new Error('Store does not exist');

    // 3. return store data
    return storeFound;
  };

  public getRetrievedDataFromUserLocation = async (location: string, options: ISearchStoreOption) => {
    const { search, page } = options;
    // 1. Convert location type string => { }
    const parsedLocation = parsingLocation(location);
    this.logger.debug(`location: ${JSON.stringify(parsedLocation)}`);

    // 2. Convert location type { } => 'POINT(longitude, latitude)'
    const convertedLocation = convertLocationToPointType(parsedLocation);

    // 3. Set as default value if page does not exist
    const pagination = getPaginationByPage(page);

    return this.storeRepository.getRetrievedDataFromUserLocation(convertedLocation, {
      search,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  };

  public insertStoreData = async () => {
    const storeData = {
      description: '2번맛집',
      store_phone_number: '01032324123',
      package_available: 0,
      min_order_price: 15000,
      address: '강남구',
      category: 1,
      owner: 1,
    };

    await this.storeRepository.insert(storeData);
  };

  public deleteStoreData = async (id: number) => {
    // 1. Get store data by id
    const storeFound = await this.storeRepository.getStoreDetailData(id);
    this.logger.debug(`Store: ${JSON.stringify(storeFound)}`);

    // 2. Delete store data if the store exist
    if (!storeFound) return { message: 'Store does not exist' };
    return await this.storeRepository.deleteStore(id);
  };

  public updateStoreData = async (id: number, data: IUpdateStoreRequest) => {
    this.logger.debug(`Data: ${JSON.stringify(data)}`);
    return await this.storeRepository.update(id, data);
  };
}
