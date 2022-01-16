import { inject, injectable } from 'inversify';
import UserEntity from '../../infrastructure/db/mariaDB/entity/users';
import { IDatabase } from '../../infrastructure/db/mariadb/interface';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { encryptWithSHA256 } from '../../util/crypto';
import { IInsertUserData, IUserData, IUserRepository, IUserService } from './interface';

export interface UserData {
  phone_number: string;
  nick_name: string;
}

// @ts-ignore
@injectable()
export class UserService implements IUserService {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.MariaDB) private mariaDB: IDatabase
  @inject(TYPES.UserRepository) private userRepository: IUserRepository;

  tableName = 'users';

  public async getUserDataById (id: number): Promise<UserEntity> {
    // Get user data 
    const userFound = await this.userRepository.getUserDataById(id);
    if (userFound) {
      return userFound
    } else {
      throw new Error('Does not exist user');
    }
  }

  public async insertUserData (userData: IUserData): Promise<UserEntity> {
    const { phoneNumber, nickName, ci, } = userData;
    this.logger.debug(`phoneNumber: ${phoneNumber}, nickName: ${nickName}`);

    // 1. Encrypt ci with sha256
    const encryptedCI = encryptWithSHA256(ci);
    this.logger.debug(`encryptedCI: ${encryptedCI}`);

    // 2. Constructor user data 
    const insertUserData: IInsertUserData = {
      phone_number: phoneNumber,
      nick_name: nickName,
      encrypted_ci: encryptedCI,
    }

    // 3. Check if th user is registered 
    const userFound: UserEntity = await this.userRepository.getUserDataByEncryptedCI(encryptedCI);
    this.logger.debug(`userFound: ${JSON.stringify(userFound)}`);

    if (!userFound) {
      // 3-1 Insert user if the user is not registered
      return await this.userRepository.insertUserData(insertUserData);
    }

    // 3-2 Update user if not matched user's phone number  
    if (userFound.phone_number !== phoneNumber) {
      userFound.phone_number = phoneNumber;
      userFound.updated_at = new Date();
      return await this.userRepository.updateUserData(userFound);
    }
    return userFound;
  }

  public async deleteUserData (id: number): Promise<void> {
    // 1. Get user data by id 
    const userFound = await this.userRepository.getUserDataById(id);
    // 2. Delete user 
    if (userFound) {
      return await this.userRepository.deleteUserDataById(id);
    } else {
      throw Error('Does not exist user');
    }
  }
}