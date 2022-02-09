import { inject, injectable } from 'inversify';
import UserEntity from '../../infrastructure/db/mariaDB/entity/user/user';
import { IDatabase } from '../../infrastructure/db/mariaDB/mariaDB';
import { TYPES } from '../../types';
import { JWT } from '../interface';

export const USER_TABLE = 'user';

export interface IUserRepository {
  getUserById: (id: number) => Promise<any>; // My Page
  getTokenByEncryptedCI: (encryptedCI: string) => Promise<JWT>; // Login
  insertUser: (data: any) => Promise<UserEntity>; // Sign up
  deleteUserById: (id: number) => Promise<void>; // Withdraw
  updateUser: (data: any) => Promise<UserEntity>; // Modify user information
  // @TODO 유저 검색 기록 가지고 오기 (주소)
  // @TODO 최근 검색어 가지고 오기(음식, 음식점)
}

// @ts-ignore
@injectable()
export class UserRepository {
  @inject(TYPES.MariaDB) private db: IDatabase;
}
