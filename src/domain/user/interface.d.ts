import { Router } from 'express';
import UserEntity from '../../infrastructure/db/mariaDB/entity/users';

export interface IHttpRouter {
  init: () => void;
  get: () => Router;
}

export interface IInsertUserData {
  nickname: string;
  phone_number: string;
  encrypted_ci: string;
}

export interface IUserData {
  nickname: string;
  phoneNumber: string;
  ci: string;
}

export interface IUpdateUserData extends IInsertUserData {
  id: number;
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
  insertUserData: (data: IUserData) => Promise<string>;
  deleteUserData: (id: number) => Promise<void>;
}
