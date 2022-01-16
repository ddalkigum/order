import { Router } from 'express';
import UserEntity from '../../infrastructure/db/mariaDB/entity/users';
import { IEntity } from '../../infrastructure/db/mariadb/interface';

export interface IHttpRouter {
  init: () => void;
  get: () => Router;
}

export interface IInsertUserData {
  nick_name: string;
  phone_number: string;
  encrypted_ci: string;
}

export interface IUserData {
  nickName: string;
  phoneNumber: string;
  ci: string
}

export interface IUpdateUserData extends IInsertUserData {
  id: number
}

export interface IUserRepository {
  getUserDataById: (id: number) => Promise<UserEntity>;
  getUserDataByEncryptedCI: (encryptedCI: string) => Promise<Userentity>;
  insertUserData: (data: IInsertUserData) => Promise<UserEntity>;
  deleteUserDataById: (id: number) => Promise<void>;
  updateUserData: (data: IInsertUserData) => Promise<UserEntity>;
}

export interface IUserService {
  getUserDataById: (id: number) => Promise<UserEntity>;
  insertUserData: (data: IUserData) => Promise<T>;
  deleteUserData: (id: number) => Promise<void>;
}
