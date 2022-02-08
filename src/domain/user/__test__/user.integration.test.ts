import request from 'supertest';
import jwt from 'jsonwebtoken';
import { container } from '../../../container';
import { TYPES } from '../../../types';
import { IDatabase } from '../../../infrastructure/db/mariadb/interface';
import { testHelper } from './helper';
import { ILogger } from '../../../infrastructure/logger/interface';

const TEST_USER_TABLE = 'user_test';

const server: any = container.get(TYPES.Server);
const logger: ILogger = container.get(TYPES.Logger);
const db: IDatabase = container.get(TYPES.MariaDB);

beforeAll(async () => {
  // initialize server middleware, router
  server.set();

  // hide debug logging
  jest.spyOn(logger, 'debug').mockImplementation(() => null);
  await db.init();
});

afterAll(async () => {
  await db.truncate(TEST_USER_TABLE);
  jest.clearAllMocks();
  await db.close();
});

describe('User integration test', () => {
  let id;
  describe('Insert user test', () => {
    test('Insert new user should return Success status', async () => {
      await request(server.app)
        .post('/api/v1/user')
        .send({ userData: testHelper.router.userData })
        .expect(200)
        .expect((response) => {
          const token = response.body.result;
          const verified = jwt.verify(token, 'order') as any;
          id = verified.id;
          expect(response.body.status).toEqual('Success');
        });
    });

    test('Insert incorrect user data should return parameter can not be null', async () => {
      await request(server.app)
        .post('/api/v1/user')
        .send({
          userData: {
            phoneNumber: '010',
          },
        })
        .expect((response) => {
          expect(response.body.message).toEqual('Parameter can not be null');
        });
    });

    test('Update user should return modified phone number', async () => {
      await request(server.app)
        .post('/api/v1/user')
        .send({ userData: testHelper.router.userDataForUpdate })
        .expect(200)
        .expect((response) => {
          const { status, result } = response.body;
          expect(status).toEqual('Success');
          expect(result.phone_number).toEqual(testHelper.router.userDataForUpdate.phoneNumber);
        });
    });
  });

  describe('Get user test', () => {
    test('Get user should return user entity', async () => {
      await request(server.app)
        .get(`/api/v1/user/${id}`)
        .expect(200)
        .expect((response) => {
          const { status, result } = response.body;
          expect(status).toEqual('Success');
          expect(result.phone_number).toEqual(testHelper.router.userDataForUpdate.phoneNumber);
        });
    });
  });

  describe('Delete user test', () => {
    test('Should return success status', async () => {
      await request(server.app)
        .delete(`/api/v1/user/${id}`)
        .expect((response) => {
          expect(response.body.status).toEqual('Success');
        });
    });
  });
});
