export const isNumber = (x: any): x is number => {
  return typeof x === 'number';
};

export const isString = (x: any): x is string => {
  return typeof x === 'string';
};

export const isBoolean = (x: any): x is boolean => {
  return typeof x === 'boolean';
};

export const isObject = (x: any): x is boolean => {
  return typeof x === 'object';
};