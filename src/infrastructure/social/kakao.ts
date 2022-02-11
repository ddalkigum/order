import axios from 'axios';
import { inject, injectable } from 'inversify';
import { config } from '../../config';
import { TYPES } from '../../types';
import { IWinstonLogger } from '../logger/interface';

const REDIRECT_URL = 'http://localhost:3000/api/v1/user/login/social/kakao/callback';
const KAKAO_GET_TOKEN_SERVER_URL = 'https://kauth.kakao.com';
const KAKAO_GET_USER_DATA_SERVER_URL = 'https://kapi.kakao.com';

export interface IKakaoSercvice {
  getAccessTokenFromKakaoServer: (code: string) => Promise<string>;
  getEmailFromKakaoServer: (accessToken: string) => Promise<string>;
}

@injectable()
export class KakaoService implements IKakaoSercvice {
  @inject(TYPES.WinstonLogger) private logger: IWinstonLogger;

  public getAccessTokenFromKakaoServer = async (code: string) => {
    this.logger.debug(`KakaoService: getAccessTokenFromKakaoServer, code: ${code}`);
    const result = await axios.post(
      `${KAKAO_GET_TOKEN_SERVER_URL}/oauth/token`,
      {},
      {
        params: {
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URL,
          client_id: config.kakaoJavascriptSecret,
          code,
        },
      },
    );
    return result.data.access_token;
  };

  public getEmailFromKakaoServer = async (accessToken: string) => {
    this.logger.debug(`KakaoService: getEmailFromKakaoServer, accessToken: ${accessToken}`);
    const result = await axios.get(`${KAKAO_GET_USER_DATA_SERVER_URL}/v2/user/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return result.data.kakao_account.email;
  };
}
