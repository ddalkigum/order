import { container } from '../../../container';
import { IDatabase } from '../../../infrastructure/db/mariadb/interface';
import { TYPES } from '../../../types';
import { encryptWithSHA256 } from '../../../util/crypto';
import { IInsertUserData, IUserRepository } from '../interface';

const USER_CI = 'testCI';
const TEST_USER_TABLE = 'users_test';
const TEST_USER_PHONE_NUMBER = '01011112222';
const TEST_USER_NICKNAME = 'testNickName';
const TEST_UPDATE_PHONE_NUMBER = '01011113333';

const userRepository: IUserRepository = container.get(TYPES.UserRepository);
const db: IDatabase = container.get(TYPES.MariaDB);
userRepository['tableName']= TEST_USER_TABLE;
const encryptedCI = encryptWithSHA256(USER_CI)

beforeAll(async () => {
  await db.init()
})

afterAll(async () => {
  await db.truncate(TEST_USER_TABLE);
  await db.close();
})

describe('User repository test', () => {
  // constructor user data
  const userData: IInsertUserData = {
    phone_number: TEST_USER_PHONE_NUMBER,
    nick_name: TEST_USER_NICKNAME,
    encrypted_ci: encryptedCI,
  }

  let id;

  // Insert user data 
  describe('Insert user data', () => {
    test("Should return userEntity", async () => {
      const result = await userRepository.insertUserData(userData);
      id = result.id;
      expect(result.phone_number).toEqual(userData.phone_number);
      expect(result.nick_name).toEqual(userData.nick_name);
      expect(result.encrypted_ci).toEqual(userData.encrypted_ci);
    })

    // get user data by encrypted ci 
    test('Should return userEntity', async () => {
      const result = await userRepository.getUserDataByEncryptedCI(encryptedCI);
      expect(result.phone_number).toEqual(userData.phone_number);
      expect(result.nick_name).toEqual(userData.nick_name);
      expect(result.encrypted_ci).toEqual(userData.encrypted_ci);
    })

    // update user 
    test('Should return updated phone number', async () => {
      // update users phone number 
      userData.phone_number = TEST_UPDATE_PHONE_NUMBER;
      const result = await userRepository.updateUserData(userData);
      expect(result.phone_number).toEqual(TEST_UPDATE_PHONE_NUMBER);
      expect(result.nick_name).toEqual(userData.nick_name);
      expect(result.encrypted_ci).toEqual(userData.encrypted_ci);
    })

    // get user data by id
    test('Should return user entity', async () => {
      const result = await userRepository.getUserDataById(id);
      expect(result.phone_number).toEqual(TEST_USER_PHONE_NUMBER);
      expect(result.nick_name).toEqual(userData.nick_name);
      expect(result.encrypted_ci).toEqual(userData.encrypted_ci);
    })

    // delete user 
    test('Should return undefined', async () => {
      // delete user data 
      await userRepository.deleteUserDataById(id);

      // get user by id 
      const result = await userRepository.getUserDataById(id);
      expect(result).toEqual(undefined);
    })
  })
})