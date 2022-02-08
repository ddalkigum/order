import { ISearchStoreOption } from '../../../domain/store/service';

const MAX_DISTANCE = 5000;

export const getStoreQueryBySearch = (location: string, options: ISearchStoreOption) => {
  if (options.search) {
    return `
    SELECT *, ST_DISTANCE_SPHERE(${location}, location) AS distance
    FROM store
    WHERE store.name='${options.search}'
    AND ST_DISTANCE_SPHERE(${location}, location) < ${MAX_DISTANCE}
    ORDER BY distance
    LIMIT ${options.limit} OFFSET ${options.offset}`;
  }
  return `
  SELECT *, ST_DISTANCE_SPHERE(${location}, location) AS distance
  FROM store
  WHERE ST_DISTANCE_SPHERE(${location}, location) < ${MAX_DISTANCE}
  ORDER BY distance
  LIMIT ${options.limit} OFFSET ${options.offset}`;
};
