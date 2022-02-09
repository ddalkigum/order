import { inject, injectable } from 'inversify';
import UserEntity from '../../infrastructure/db/mariaDB/entity/user/user';
import { IDatabase } from '../../infrastructure/db/mariaDB/mariaDB';
import { TYPES } from '../../types';

export const USER_TABLE = 'user';

export interface IUserRepository {
  getUserDataById: (id: number) => Promise<UserEntity>;
  getUserDataByEncryptedCI: (encryptedCI: string) => Promise<UserEntity>;
  insertUserData: (data: any) => Promise<UserEntity>;
  deleteUserDataById: (id: number) => Promise<void>;
  updateUserData: (data: any) => Promise<UserEntity>;
}

// @ts-ignore
@injectable()
export class UserRepository {
  @inject(TYPES.MariaDB) private db: IDatabase;
}
