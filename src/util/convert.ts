import { ILocation } from '../common/type/lcation';
import { IEntity } from '../infrastructure/db/mariaDB/mariaDB';

export const convertLocationToPointType = (location: ILocation) => {
  return `POINT(${location.longitude}, ${location.latitude})`;
};

export const convertSnakeToCamelFormat = (string) => {
  return string.replace(/(_\w)/g, (k) => k[1].toUpperCase());
};

export const convertEntityToCamelFormat = <T extends IEntity>(entity: T) => {
  const camelCaseObject = {};
  const keyList = Object.keys(entity);
  let value;
  let converted;

  keyList.forEach((key) => {
    value = entity[key];
    converted = convertSnakeToCamelFormat(key);
    camelCaseObject[converted] = value;
  });

  return camelCaseObject;
};
