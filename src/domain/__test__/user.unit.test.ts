import { container } from '../../container';
import { IDatabase } from '../../infrastructure/db/mariadb/mariaDB';
import { TYPES } from '../../types';
import { IUserService } from '../service/user';

const MariaDB = container.get<IDatabase>(TYPES.MariaDB)

beforeAll(async () => {
  await MariaDB.init();
})

afterAll(async () => {
  await MariaDB.close();
})

describe('User Service Test', () => {
  const TEST_USER_NICK_NAME = 'ddalkigum';
  const TEST_USER_PHONE_NUMBER = '01011111111';
  let userId;
  const UserService = container.get<IUserService>(TYPES.UserService);
  describe('User Create Test', () => {
    test('should return user id', async () => {
      userId = await UserService.insertUserData(TEST_USER_NICK_NAME, TEST_USER_PHONE_NUMBER);
      expect(typeof userId).toEqual('number');
    })

    test('should return test user data', async () => {
      const result = await UserService.getUserDataById(userId);
      expect(result['nick_name']).toEqual(TEST_USER_NICK_NAME)
      expect(result['phone_number']).toEqual(TEST_USER_PHONE_NUMBER)
    })

    test('should return deleted user id', async () => {
      const result = await UserService.deleteUserData(userId);
      expect(result)
    })
  })
})
