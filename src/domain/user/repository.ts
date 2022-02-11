import { inject, injectable } from 'inversify';
import UserEntity from '../../infrastructure/db/mariaDB/entity/user/user';
import { IDatabase } from '../../infrastructure/db/mariaDB/mariaDB';
import { IWinstonLogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { IUserInsertResult, IUserJoin } from './interface';

export const USER_TABLE = 'user';

export interface IUserRepository {
  getUserByEmail: (email: string) => Promise<UserEntity>;
  insert: (userData: IUserJoin) => Promise<IUserInsertResult>;
  getUserById: (userId: number) => Promise<UserEntity>;
  update: (userData: Partial<UserEntity>) => Promise<Partial<UserEntity>>;
}

@injectable()
export class UserRepository implements IUserRepository {
  @inject(TYPES.MariaDB) private db: IDatabase;
  @inject(TYPES.WinstonLogger) private logger: IWinstonLogger;

  public getUserByEmail = async (email: string) => {
    this.logger.debug(`UserRepository: getUserDataByEmail`);
    return await this.db.getDataByColumn<UserEntity>(USER_TABLE, { email });
  };

  public insert = async (userData: IUserJoin) => {
    this.logger.debug(`UserRepository: insert`);
    return await this.db.insertWithoutId<IUserInsertResult>(USER_TABLE, userData);
  };

  public getUserById = async (userId: number) => {
    this.logger.debug(`UserRepository: getUserById`);
    return await this.db.getDataById<UserEntity>(USER_TABLE, userId);
  };

  public update = async (userData: Partial<UserEntity>) => {
    this.logger.debug(`UserRepository: update`);
    return await this.db.updateData(USER_TABLE, userData.id, userData);
  };
}
