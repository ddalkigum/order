import { inject, injectable } from 'inversify';
import { IDatabase } from '../../infrastructure/db/mariadb/mariaDB';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import * as UserQuery from '../../infrastructure/db/mariadb/query/user';

interface IUserData {
  id: number;
  phoneNumber: string;
  nickName: string;
}

export interface IUserService {
  getUserDataById: (id: number) => Promise<IUserData>
  insertUserData: (nickname: string, phoneNumber: string) => Promise<number>;
  deleteUserData: (id: number) => Promise<void>;
}

@injectable()
export class UserService implements IUserService {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.MariaDB) private mariaDB: IDatabase

  public async getUserDataById (id: number): Promise<IUserData> {
    this.logger.debug(`get user data id: ${id}`);
    const userData = await this.mariaDB.executeSelectQuery(UserQuery.getUserData, [id])
    return userData.length === 0 ? 'DoesNotExistUser' : userData[0]
  }

  public async insertUserData (nickName: string, phoneNumber: string): Promise<number> {
    this.logger.debug(`insert user data nick name: ${nickName}, phone number: ${phoneNumber}`);
    return await this.mariaDB.executeWriteQuery(UserQuery.insertUserData, [nickName, phoneNumber]);
  }

  public async deleteUserData (id: number): Promise<any> {
    this.logger.debug(`delete user data id: ${id}`);
    return await this.mariaDB.executeWriteQuery(UserQuery.deleteUserDataById, [id]);
  }
}