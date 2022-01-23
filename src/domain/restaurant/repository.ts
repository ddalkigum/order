import { inject, injectable } from 'inversify';
import CategoryEntity from '../../infrastructure/db/mariadb/entity/restaurant/categories';
import RestaurantEntity from '../../infrastructure/db/mariaDB/entity/restaurant/restaurants';
import { IDatabase } from '../../infrastructure/db/mariadb/interface';
import { TYPES } from '../../types';
import { IInsertRestaurantData, IRestaurantRepository } from './interface';

export const RESTAURANT_TABLE = 'restaurants';
export const CATEGORY_TABLE = 'categories';

// @ts-ignore
@injectable()
export default class RestaurantRepository implements IRestaurantRepository {
  @inject(TYPES.MariaDB) private db: IDatabase;

  public async getCategoryList(): Promise<CategoryEntity[]> {
    return await this.db.getAllData(CATEGORY_TABLE);
  }

  public async insertCategory(name: string): Promise<CategoryEntity> {
    return await this.db.insertWithoutId(CATEGORY_TABLE, { name });
  }

  public async deleteCategory(name: string): Promise<void> {
    return await this.db.deleteDataById(CATEGORY_TABLE, name);
  }

  public async getRestaurantById(id: number): Promise<RestaurantEntity> {
    return await this.db.getDataById(RESTAURANT_TABLE, id);
  }

  public async getRestaurantListByaddress(address: string): Promise<RestaurantEntity[]> {
    return await this.db.getDataListByColumn(RESTAURANT_TABLE, { address });
  }

  public async insertRestaurant(restaurantData: IInsertRestaurantData) {
    return await this.db.insertWithoutId(RESTAURANT_TABLE, restaurantData);
  }

  public async deleteRestaurant(id: number) {
    return await this.db.deleteDataById(RESTAURANT_TABLE, id);
  }
}
