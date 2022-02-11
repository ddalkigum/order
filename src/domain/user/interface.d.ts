import UserEntity from '../../infrastructure/db/mariaDB/entity/user/user';
import { IEntity } from '../../infrastructure/db/mariaDB/mariaDB';

export type JoinType = 'K' | 'F' | 'G' | 'S';

export interface IUserJoin {
  password: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  type?: JoinType;
}

export type IUpdateUser = Partial<UserEntity>;
export type IUserInsertResult = IUserJoin & IEntity;
