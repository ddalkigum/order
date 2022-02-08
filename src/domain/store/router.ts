import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IApiResponse } from '../../common/api/interface';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { checkRequired } from '../../util/checkRequired';
import { IHttpRouter } from '../user/interface';
import { ISearchStoreOption, IStoreService } from './service';

// @ts-ignore
@injectable()
export class StoreRouter implements IHttpRouter {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.ApiResponse) private apiResponse: IApiResponse;
  @inject(TYPES.StoreService) private storeService: IStoreService;

  private router = Router();

  public init = () => {
    this.router.get('/location/:userLocation', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        const { userLocation } = request.params;
        const { search, page }: ISearchStoreOption = request.query;
        this.logger.debug(`user location: ${userLocation}`);
        this.logger.debug(`search: ${search}, page: ${page}`);
        // location: @longitude,latitude

        checkRequired([userLocation]);
        return this.storeService.getRetrievedDataFromUserLocation(userLocation, {
          search,
          page,
        });
      });
    });

    // Register store
    this.router.post('/', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        return await this.storeService.insertStoreData();
      });
    });

    // Store detail view ( store data, menu list  )
    this.router.get('/:id', (request: Request, response: Response, next: NextFunction) => {
      this.apiResponse.generateResponse(request, response, next, async () => {
        const storeId = parseInt(request.params.id);
        const storeData = await this.storeService.getStoreMenuList(storeId);
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
