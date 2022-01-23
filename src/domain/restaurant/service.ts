import { inject, injectable } from 'inversify';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { checkRequired } from '../../util/checkRequired';
import { IRestaurantData, IRestaurantRepository, IRestaurantService } from './interface';

// @ts-ignore
@injectable()
export default class RestaurantService implements IRestaurantService {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.RestaurantRepository) private restaurantRepository: IRestaurantRepository;

  public async getCategoryList() {
    // get category data list
    return await this.restaurantRepository.getCategoryList();
  }

  public async registCategory(name: string) {
    checkRequired([name]);
    return await this.restaurantRepository.insertCategory(name);
  }

  public async deleteCategory(name: string) {
    checkRequired([name]);
    return await this.restaurantRepository.deleteCategory(name);
  }

  public async getRestaurantById(id: number) {
    checkRequired([id]);
    return await this.restaurantRepository.getRestaurantById(id);
  }

  public async getRestaurantListByaddress(address: string) {
    checkRequired([address]);
    return await this.restaurantRepository.getRestaurantListByaddress(address);
  }

  public async insertRestaurant(restaurantData: IRestaurantData) {
    const { name, latitude, longitude, address, subAddress, categoryID } = restaurantData;
    // 1. Check require data
    checkRequired([name, latitude, longitude, address, subAddress, categoryID]);

    // 2. Constructor restaurant data
    const insertRestaurantData = {
      name,
      latitude,
      longitude,
      address,
      sub_address: subAddress,
      category_id: categoryID,
    };

    // 3. Insert data
    return await this.restaurantRepository.insertRestaurant(insertRestaurantData);
  }

  public async deleteRestaurant(id: number) {
    return await this.restaurantRepository.deleteRestaurant(id);
  }
}
