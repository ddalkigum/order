import CategoryEntity from '../../infrastructure/db/mariadb/entity/restaurant/categories';
import RestaurantEntity from '../../infrastructure/db/mariaDB/entity/restaurant/restaurants';

export interface IInsertRestaurantData {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  sub_address: string;
  category_id: number;
}

export interface IRestaurantData {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  subAddress: string;
  categoryID: number;
}

export interface IRestaurantRepository {
  getCategoryList: () => Promise<CategoryEntity[]>;
  insertCategory: (name: string) => Promise<CategoryEntity>;
  deleteCategory: (name: string) => Promise<void>;
  getRestaurantById: (id: number) => Promise<RestaurantEntity>;
  getRestaurantListByaddress: (address: string) => Promise<RestaurantEntity[]>;
  insertRestaurant: (restaurantData: IInsertRestaurantData) => Promise<T>;
  deleteRestaurant: (id: number) => Promise<void>;
}

export interface IRestaurantService {
  getCategoryList: () => Promise<CategoryEntity[]>;
  registCategory: (name: string) => Promise<CategoryEntity>;
  deleteCategory: (name: string) => Promise<void>;
  getRestaurantById: (id: number) => Promise<RestaurantEntity>;
  getRestaurantListByaddress: (address: string) => Promise<RestaurantEntity[]>;
  insertRestaurant: (restaurantData: IRestaurantData) => Promise<T>;
  deleteRestaurant: (id: number) => Promise<void>;
}
