import { ILocation } from '../common/type/lcation';
import { IPagination } from '../common/type/pagination';

const PAGE_SIZE = 10;

export const parsingLocation = (location: string): ILocation => {
  const [longitude, latitude] = location.split('@')[1].split(',');
  return {
    longitude: parseFloat(longitude),
    latitude: parseFloat(latitude),
  };
};

export const getPaginationByPage = (page: number): IPagination => {
  const limit = page * PAGE_SIZE;
  return {
    limit,
    offset: limit - PAGE_SIZE,
  };
};
