import { inject, injectable } from 'inversify';
import MenuEntity from '../../infrastructure/db/mariaDB/entity/menu/menu';
import StoreCategoryEntity from '../../infrastructure/db/mariaDB/entity/store/category';
import StoreEntity from '../../infrastructure/db/mariaDB/entity/store/store';
import { IWinstonLogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { convertLocationToPointType } from '../../util/convert';
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
  getStoreCategoryList: () => Promise<StoreCategoryEntity[]>;
  getStoreSimpleList: (categoryName: string, userLocation: string) => Promise<any[]>;
  getStoreMenuList: (id: number) => Promise<MenuEntity[]>;
  getStoreDetailData: (id: number) => Promise<StoreEntity>;
  getRetrievedDataFromUserLocation: (location: string, options: ISearchStoreOption) => Promise<any>;
  insertStoreData: () => Promise<any>;
  deleteStoreData: (id: number) => Promise<any>;
  updateStoreData: (id: number, data: IUpdateStoreRequest) => Promise<StoreEntity>;
}

@injectable()
export class StoreService implements IStoreService {
  @inject(TYPES.WinstonLogger) private logger: IWinstonLogger;
  @inject(TYPES.StoreRepository) private storeRepository: IStoreRepository;

  public getStoreCategoryList = async () => {
    this.logger.debug(`StoreService: getStoreCategoryList`);
    return await this.storeRepository.getStoreCategoryList();
  };

  // Get store list ( 가게 이름, 평점, 리뷰 갯수, 설명, 최소주문금액, 배달팁, 배달 시간 )
  public getStoreSimpleList = async (categoryName: string, userLocation: string) => {
    this.logger.debug(`StoreService: getStoreSimpleList`);
    // Get store list search by category name
    const parsedLocation = parsingLocation(userLocation);
    this.logger.debug(`location: ${JSON.stringify(parsedLocation)}`);

    const convertedLocation = convertLocationToPointType(parsedLocation);

    return await this.storeRepository.getStoreSimpleListSearchByCategory(categoryName, convertedLocation);
    // Get count of review, grade
  };

  public getStoreMenuList = async (id: number) => {
    const result = await this.storeRepository.getStoreMenuList(id);
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
