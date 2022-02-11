import { container } from '../../../container';
import { IDatabase } from '../../../infrastructure/db/mariaDB/mariaDB';
import { TYPES } from '../../../types';
import { IUserRepository } from '../repository';
import { testHelper } from './helper';

const userRepository: IUserRepository = container.get(TYPES.UserRepository);
const db: IDatabase = container.get(TYPES.MariaDB);
const USER_TABLE_NAME = 'user';

beforeAll(async () => {
  await db.init();
});

afterAll(async () => {
  await db.truncate(USER_TABLE_NAME);
  await db.close();
});

describe('User repository test', () => {
  // constructor user data
  const { userData } = testHelper;

  let id;

  // Insert user data
  describe('Insert user data', () => {
    test('Should return userEntity', async () => {
      const result = await userRepository.insert(userData);
      id = result.id;
      expect(result.phoneNumber).toEqual(userData.phoneNumber);
      expect(result.nickname).toEqual(userData.nickname);
    });

    // get user data by id
    test('Should return user entity', async () => {
      const result = await userRepository.getUserById(id);
      expect(result.phoneNumber).toEqual(userData.phoneNumber);
      expect(result.nickname).toEqual(userData.nickname);
    });

    // update user
    test('Should return updated phone number', async () => {
      // update users email, phone number
      const result = await userRepository.update({ id, ...testHelper.update });
      expect(result.email).toEqual(testHelper.update.email);
      expect(result.nickname).toEqual(testHelper.update.nickname);
    });

    // get user data by id
    test('Should return updated user entity', async () => {
      const result = await userRepository.getUserById(id);
      expect(result.nickname).toEqual(testHelper.update.nickname);
      expect(result.email).toEqual(testHelper.update.email);
    });
  });
});
