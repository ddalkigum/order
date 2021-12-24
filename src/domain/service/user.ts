import { inject, injectable } from 'inversify';
import { UserInfo } from 'os';
import { SuccessResponse } from '../../common/api/interface';
import { IDatabase } from '../../infrastructure/db/mariadb/interface';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';

interface IUserData {
  id: number;
  phoneNumber: string;
  nickName: string;
}

export interface IUserService {
  getUserDataById: (id: number) => Promise<IUserData>
  insertUserData: (nickname: string, phoneNumber: string) => Promise<void>;
  deleteUserData: (id: number) => Promise<void>;
}

@injectable()
export class UserService implements IUserService {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.MariaDB) private mariaDB: IDatabase

  public async getUserDataById (id: number): Promise<IUserData> {
    // get user data by id 
    this.logger.debug(`get user data id: ${id}`);
    const query = `select * from user where id=?`
    const userData = await this.mariaDB.executeSelectQuery(query, [id])
    return userData.length === 0 ? 'DoesNotExistUser' : userData[0]
  }

  public async insertUserData (nickName: string, phoneNumber: string): Promise<void> {
    this.logger.debug(`insert user data nick name: ${nickName}, phone number: ${phoneNumber}`);
    const query = `insert into user (nick_name, phone_number) values (?, ?)`;
    await this.mariaDB.executeWriteQuery(query, [nickName, phoneNumber]);
  }

  public async deleteUserData (id: number): Promise<void> {
    this.logger.debug(`delete user data id: ${id}`);
    const query = `delete from user where id=?`
    await this.mariaDB.executeWriteQuery(query, [id]);
  }
}