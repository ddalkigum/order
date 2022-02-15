import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IApiResponse } from '../../common/api/interface';
import { IWinstonLogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { checkRequired } from '../../util/checkRequired';
import { IHttpRouter } from '../interface';
import { IStoreService } from './service';

@injectable()
export class StoreRouter implements IHttpRouter {
  @inject(TYPES.WinstonLogger) private logger: IWinstonLogger;
  @inject(TYPES.ApiResponse) private apiResponse: IApiResponse;
  @inject(TYPES.StoreService) private storeService: IStoreService;

  private router = Router();

  public init = () => {
    this.router.get('/health', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        return 'Success';
      });
    });

    // Get store category list
    this.router.get('/category/all', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        return await this.storeService.getStoreCategoryList();
      });
    });

    // Get store list filtered category
    this.router.get('/simple/:userLocation', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        const categoryName = request.query.category as string;
        const { userLocation } = request.params; // location: @longitude,latitude
        checkRequired([categoryName, userLocation]);
        return await this.storeService.getStoreSimpleList(categoryName, userLocation);
      });
    });

    // Store detail view ( store data, menu list  )
    this.router.get('/:id', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        const storeId = parseInt(request.params.id);
        const storeData = await this.storeService.getStoreDetailData(storeId);
        return { storeData };
      });
    });

    // store 삭제
    this.router.delete('/:id', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        const storeId = parseInt(request.params.id);
        return await this.storeService.deleteStoreData(storeId);
      });
    });

    // store 업데이트
    this.router.put('/:id', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        const { storeData } = request.body;
        const storeId = parseInt(request.params.id);
        return await this.storeService.updateStoreData(storeId, storeData);
      });
    });
  };

  public get = () => {
    return this.router.bind(this);
  };
}
