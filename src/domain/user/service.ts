import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import UserEntity from '../../infrastructure/db/mariaDB/entity/user/user';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { checkRequired } from '../../util/checkRequired';
import { encryptWithSHA256 } from '../../util/crypto';
import { IInsertUserData, IUserData, IUserRepository, IUserService } from './interface';
import { config } from '../../config';

export interface UserData {
  phone_number: string;
  nickname: string;
}

// @ts-ignore
@injectable()
export class UserService implements IUserService {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.UserRepository) private userRepository: IUserRepository;

  tableName = 'users';

  public async getUserDataById(id: number): Promise<UserEntity> {
    // Get user data
    checkRequired([id]);
    const userFound = await this.userRepository.getUserDataById(id);
    if (userFound) {
      return userFound;
    }
    throw new Error('Does not exist user');
  }

  public async insertUserData(userData: IUserData): Promise<string> {
    const { phoneNumber, nickname, ci } = userData;
    checkRequired([phoneNumber, nickname, ci]);
    this.logger.debug(`phoneNumber: ${phoneNumber}, nickname: ${nickname}`);

    // 1. Encrypt ci with sha256
    const encryptedCI = encryptWithSHA256(ci);
    this.logger.debug(`encryptedCI: ${encryptedCI}`);

    // 2. Constructor user data
    const insertUserData: IInsertUserData = {
      phone_number: phoneNumber,
      nickname,
      encrypted_ci: encryptedCI,
    };

    // 3. Check if th user is registered
    const userFound: UserEntity = await this.userRepository.getUserDataByEncryptedCI(encryptedCI);
    this.logger.debug(`userFound: ${JSON.stringify(userFound)}`);

    if (!userFound) {
      // 3-1 Insert user if the user is not registered
      const userData = await this.userRepository.insertUserData(insertUserData);
      const { id } = userData;
      const token = jwt.sign({ id }, config.jwtSignKey);
      return token;
    }

    // 3-2 Update user if not matched user's phone number
    if (userFound.phone_number !== phoneNumber) {
      userFound.phone_number = phoneNumber;
      userFound.updated_at = new Date();
      return await this.userRepository.updateUserData(userFound);
    }

    // create user token
    const token = jwt.sign({ id: userFound.id }, config.jwtSignKey);
    return token;
  }

  public async deleteUserData(id: number): Promise<void> {
    // 1. Get user data by id
    checkRequired([id]);
    const userFound = await this.userRepository.getUserDataById(id);
    // 2. Delete user
    if (userFound) {
      return await this.userRepository.deleteUserDataById(id);
    }
    throw Error('Does not exist user');
  }
}
