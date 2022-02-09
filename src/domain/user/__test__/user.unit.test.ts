// import { container } from '../../../container';
// import { IDatabase } from '../../../infrastructure/db/mariaDB/mariaDB';
// import { TYPES } from '../../../types';
// import { IUserRepository } from '../repository';
// import { testHelper } from './helper';

// const userRepository: IUserRepository = container.get(TYPES.UserRepository);
// const db: IDatabase = container.get(TYPES.MariaDB);

// beforeAll(async () => {
//   await db.init();
// });

// afterAll(async () => {
//   await db.truncate(testHelper.tableName);
//   await db.close();
// });

// describe('User repository test', () => {
//   // constructor user data
//   const userData: IInsertUserData = testHelper.repository.userData;

//   let id;

//   // Insert user data
//   describe('Insert user data', () => {
//     test('Should return userEntity', async () => {
//       const result = await userRepository.insertUserData(userData);
//       id = result.id;
//       expect(result.phone_number).toEqual(userData.phone_number);
//       expect(result.nickname).toEqual(userData.nickname);
//       expect(result.encrypted_ci).toEqual(userData.encrypted_ci);
//     });

//     // get user data by encrypted ci
//     test('Should return userEntity', async () => {
//       const result = await userRepository.getUserDataByEncryptedCI(testHelper.repository.userData.encrypted_ci);
//       expect(result.phone_number).toEqual(userData.phone_number);
//       expect(result.nickname).toEqual(userData.nickname);
//       expect(result.encrypted_ci).toEqual(userData.encrypted_ci);
//     });

//     // update user
//     test('Should return updated phone number', async () => {
//       // update users phone number
//       const result = await userRepository.updateUserData(testHelper.repository.userDataForUpdate);
//       expect(result.phone_number).toEqual(testHelper.repository.userDataForUpdate.phone_number);
//       expect(result.nickname).toEqual(userData.nickname);
//       expect(result.encrypted_ci).toEqual(userData.encrypted_ci);
//     });

//     // get user data by id
//     test('Should return user entity', async () => {
//       const result = await userRepository.getUserDataById(id);
//       expect(result.phone_number).toEqual(testHelper.repository.userData.phone_number);
//       expect(result.nickname).toEqual(userData.nickname);
//       expect(result.encrypted_ci).toEqual(userData.encrypted_ci);
//     });

//     // delete user
//     test('Should return undefined', async () => {
//       // delete user data
//       await userRepository.deleteUserDataById(id);

//       // get user by id
//       const result = await userRepository.getUserDataById(id);
//       expect(result).toEqual(undefined);
//     });
//   });
// });
