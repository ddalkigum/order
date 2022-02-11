import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IApiResponse } from '../../common/api/interface';
import { authorization } from '../../infrastructure/express/middleware/authorization';
import { TYPES } from '../../types';
import { checkRequired } from '../../util/checkRequired';
import { IHttpRouter } from '../interface';
import { IUserService } from './service';

@injectable()
export default class UserRouter implements IHttpRouter {
  @inject(TYPES.ApiResponse) private apiResponse: IApiResponse;
  @inject(TYPES.UserService) private userService: IUserService;

  private router = Router();

  public init() {
    this.router.get('/health', async (request: Request, response: Response, next: NextFunction) => {
      await this.apiResponse.generateResponse(request, response, next, async () => {
        return 'Success';
      });
    });

    this.router.get('/check/email/:email', authorization, async (request: Request, response: Response, next: NextFunction) => {
      await this.apiResponse.generateResponse(request, response, next, async () => {
        const { email } = request.params;
        checkRequired([email]);

        const userFound = this.userService.existsUserByEmail(email);
        if (userFound) return 'UserAlreadyExist';
      });
    });

    this.router.post('/join', async (request: Request, response: Response, next: NextFunction) => {
      await this.apiResponse.generateResponse(request, response, next, async () => {
        const { userData } = request.body;
        checkRequired([userData]);

        const accessToken = await this.userService.returnAccessTokenAfterInsert(userData);
        return { accessToken };
      });
    });

    this.router.get('/me', authorization, async (request: Request, response: Response, next: NextFunction) => {
      await this.apiResponse.generateResponse(request, response, next, async () => {
        const { id } = request.body;
        checkRequired([id]);

        const userData = await this.userService.getUserById(parseInt(id));
        if (!userData) return 'UserDoesNotExist';
        return userData;
      });
    });

    this.router.put('/me', authorization, async (request: Request, response: Response, next: NextFunction) => {
      await this.apiResponse.generateResponse(request, response, next, async () => {
        const { userData } = request.body;
        checkRequired([userData]);

        return await this.userService.updateUser(userData);
      });
    });

    // Withdraw user
    this.router.delete('/me', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        return 'Success';
      });
    });

    // Social login
    this.router.get('/login/social/kakao/callback', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        const code = request.query.code as string;
        const email = await this.userService.kakaoSocialLoginCallback(code);
        return { email };
      });
    });
  }

  public get() {
    return this.router.bind(this);
  }
}
