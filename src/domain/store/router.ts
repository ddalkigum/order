import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IApiResponse } from '../../common/api/interface';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { IHttpRouter } from '../user/interface';
import { IStoreService } from './service';

// @ts-ignore
@injectable()
export class StoreRouter implements IHttpRouter {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.ApiResponse) private apiResponse: IApiResponse;
  @inject(TYPES.StoreService) private storeService: IStoreService;

  private router = Router();

  public init = () => {
    // Store detail view ( store data, menu list  )
    this.router.get('/:id', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        const storeId = parseInt(request.params.id);
        // Store view
        const storeData = await this.storeService.getStoreDetailData(storeId);
        // Menu view
        const menuList = await this.storeService.getStoreMenuList(storeId);
        return {
          store: storeData,
          menuList,
        };
      });
    });

    // store 등록

    // store 삭제

    // store 업데이트
  };

  public get = () => {
    return this.router.bind(this);
  };
}
