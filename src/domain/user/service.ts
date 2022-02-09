import { inject, injectable } from 'inversify';
import UserEntity from '../../infrastructure/db/mariaDB/entity/user/user';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { IUserRepository } from './repository';

export interface UserData {
  phone_number: string;
  nickname: string;
}

export interface IUserService {
  getUserDataById: (id: number) => Promise<UserEntity>;
  insertUserData: (data: any) => Promise<string>;
  deleteUserData: (id: number) => Promise<void>;
}

// @ts-ignore
@injectable()
export class UserService {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.UserRepository) private userRepository: IUserRepository;

  tableName = 'users';
}
