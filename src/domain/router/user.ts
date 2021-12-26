import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IApiResponse } from '../../common/api/response';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { checkRequired } from '../../util/checkRequired';
import { IUserService } from '../service/user';

export interface IHttpRouter {
  get: () => Router;
  init: () => void;
}
@injectable()
export class UserRouter implements IHttpRouter {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.ApiResponse) private apiResponse: IApiResponse;
  @inject(TYPES.UserService) private userService: IUserService;

  private router = Router();

  public get() {
    return this.router.bind(this)
  }

  public init() {
    this.router.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
      await this.apiResponse.generateResponse(request, response, next, async () => {
        this.logger.debug('Get user...');
        const id = request.params.id as string;
        checkRequired([id]);
        return await this.userService.getUserDataById(parseInt(id));
      })
    })
    
    this.router.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
      await this.apiResponse.generateResponse(request, response, next, async () => {
        this.logger.debug('Delete user...');
        const id = request.params.id as string;
        checkRequired([id]);
        return await this.userService.deleteUserData(parseInt(id));
      })
    })
    
    this.router.post('', async (request: Request, response: Response, next: NextFunction) => {
      await this.apiResponse.generateResponse(request, response, next, async () => {
        this.logger.debug('Create user...');
        const { nickName, phoneNumber } = request.body;
        checkRequired([nickName, phoneNumber]);
        return await this.userService.insertUserData(nickName, phoneNumber);
      })
    })
  }
}