import { inject, injectable } from 'inversify';
import UserEntity from '../../infrastructure/db/mariaDB/entity/user/user';
import { IDatabase } from '../../infrastructure/db/mariadb/interface';
import { TYPES } from '../../types';
import { IInsertUserData, IUpdateUserData, IUserRepository } from './interface';

export const USER_TABLE = 'user';

// @ts-ignore
@injectable()
export default class UserRepository implements IUserRepository {
  @inject(TYPES.MariaDB) private db: IDatabase;

  public async getUserDataById(id: number): Promise<UserEntity> {
    return await this.db.getDataById(USER_TABLE, id);
  }

  public async getUserDataByEncryptedCI(encryptedCI: string): Promise<UserEntity> {
    return await this.db.getDataByColumn(USER_TABLE, { encrypted_ci: encryptedCI });
  }

  public async insertUserData(data: IInsertUserData): Promise<UserEntity> {
    return await this.db.insertWithoutId(USER_TABLE, { ...data, created_at: new Date(), updated_at: new Date() });
  }

  public async deleteUserDataById(id: number): Promise<void> {
    return await this.db.deleteDataById(USER_TABLE, id);
  }

  public async updateUserData(data: IUpdateUserData): Promise<UserEntity> {
    return await this.db.updateData(USER_TABLE, data);
  }
}
