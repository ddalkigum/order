import { inject, injectable } from 'inversify';
import { IWinstonLogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { IUserRepository } from './repository';
import { IUserJoin } from './interface';
import { JWT } from '../interface';
import { generateJWT } from '../../util/jwt';
import UserEntity from '../../infrastructure/db/mariaDB/entity/user/user';
import { IKakaoSercvice } from '../../infrastructure/social/kakao';

export interface IUserService {
  existsUserByEmail: (email: string) => Promise<boolean>;
  returnAccessTokenAfterInsert: (userData: IUserJoin) => Promise<JWT>;
  getUserById: (userId: number) => Promise<UserEntity>;
  updateUser: (userData: Partial<UserEntity>) => Promise<Partial<UserEntity>>;
  kakaoSocialLoginCallback: (type: string) => Promise<string>;
}

@injectable()
export class UserService implements IUserService {
  @inject(TYPES.WinstonLogger) private logger: IWinstonLogger;
  @inject(TYPES.UserRepository) private userRepository: IUserRepository;
  @inject(TYPES.KakaoService) private kakaoService: IKakaoSercvice;

  public returnAccessTokenAfterInsert = async (userData: IUserJoin) => {
    this.logger.debug(`UserService: returnAccessTokenAfterInsert, userData: ${JSON.stringify(userData)}`);
    const insertResult = await this.userRepository.insert(userData);
    // Return access token after insert data
    return generateJWT({ id: insertResult.id });
  };

  public existsUserByEmail = async (email: string) => {
    this.logger.debug(`UserService: existsUserByEmail, email: ${email}`);
    // 1. Get user by email
    const userFound = await this.userRepository.getUserByEmail(email);
    if (userFound) return true;
    return false;
  };

  public getUserById = async (userId: number) => {
    this.logger.debug(`UserService: getUserById, userId: ${userId}`);
    // Get user data by id
    return await this.userRepository.getUserById(userId);
  };

  public updateUser = async (userData: Partial<UserEntity>) => {
    this.logger.debug(`UserService: updateUser, userData: ${JSON.stringify(this.updateUser)}`);
    return await this.userRepository.update(userData);
  };

  public kakaoSocialLoginCallback = async (code: string) => {
    this.logger.debug(`UserService: kakaoSocialLoginCallback, code: ${code}`);
    // Request kakao server
    const accessToken = await this.kakaoService.getAccessTokenFromKakaoServer(code);
    const email = await this.kakaoService.getEmailFromKakaoServer(accessToken);
    if (!email) throw new Error('Email');
    return email;
  };
}
