import { checkRequired } from '../checkRequired';
import { convertSnakeToCamelFormat, convertEntityToCamelFormat } from '../convert';
import { encryptWithSHA256 } from '../crypto';

describe('Check required unit test', () => {
  test('Should return void', () => {
    expect(checkRequired(['params', 1])).toBeUndefined();
  });

  test('Should throw Empty parameter', () => {
    try {
      checkRequired([]);
    } catch (error) {
      expect(error.message).toEqual('Empty parameter');
    }
  });
});

describe('Convert snake to camel format', () => {
  expect(convertSnakeToCamelFormat('test_snake_case')).toEqual('testSnakeCase');
});

describe('Convert entity to camel format', () => {
  test('Should return converted object key to camelcase', () => {
    const entity = { id: 1, user_address: 'test', test_case: 'test' };
    expect(convertEntityToCamelFormat(entity)).toEqual({ id: 1, userAddress: 'test', testCase: 'test' });
  });
});

describe('Encrypt sha256', () => {
  test('Should return encrypted string', () => {
    expect(encryptWithSHA256('test').length).toEqual(44);
    expect(encryptWithSHA256('testtesttesttesttesttesttesttesttesttesttesttesttesttest').length).toEqual(44);
  });
});
