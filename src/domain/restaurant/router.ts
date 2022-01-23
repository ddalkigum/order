import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IApiResponse } from '../../common/api/interface';
import { ILogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../types';
import { IHttpRouter } from '../interface';
import { IRestaurantService } from './interface';

// @ts-ignore
@injectable()
export default class RestaurantRouter implements IHttpRouter {
  @inject(TYPES.Logger) private logger: ILogger;
  @inject(TYPES.ApiResponse) private apiRseponse: IApiResponse;
  @inject(TYPES.RestaurantService) private restaurantService: IRestaurantService;

  private router = Router();

  public init() {
    this.router.get('/category', async (request: Request, response: Response, next: NextFunction) => {
      this.apiRseponse.generateResponse(request, response, next, async () => {
        this.logger.debug('Get category list...');
        return await this.restaurantService.getCategoryList();
      });
    });

    this.router.post('/category', async (request: Request, response: Response, next: NextFunction) => {
      this.apiRseponse.generateResponse(request, response, next, async () => {
        this.logger.debug('Insert category data...');
        const name = request.body;
        return await this.restaurantService.registCategory(name);
      });
    });

    this.router.delete('/category/:id', async (request: Request, response: Response, next: NextFunction) => {
      this.apiRseponse.generateResponse(request, response, next, async () => {
        this.logger.debug('Delete category data...');
        const id = request.params.id as string;
        return await this.restaurantService.deleteRestaurant(parseInt(id));
      });
    });

    this.router.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
      this.apiRseponse.generateResponse(request, response, next, async () => {
        this.logger.debug('Get Restaurant data...');
        const id = request.params.id as string;
        return await this.restaurantService.getRestaurantById(parseInt(id));
      });
    });

    this.router.get('/', async (request: Request, response: Response, next: NextFunction) => {
      this.apiRseponse.generateResponse(request, response, next, async () => {
        this.logger.debug('Get Restaurant data list ...');
        const address = request.query.address as string;
        return await this.restaurantService.getRestaurantListByaddress(address);
      });
    });

    this.router.post('/', async (request: Request, response: Response, next: NextFunction) => {
      this.apiRseponse.generateResponse(request, response, next, async () => {
        this.logger.debug('Insert Restaurant data...');
        const restaurantData = request.body;
        return await this.restaurantService.insertRestaurant(restaurantData);
      });
    });

    this.router.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
      this.apiRseponse.generateResponse(request, response, next, async () => {
        this.logger.debug('Delete Restaurant data...');
        const id = request.query.id as string;
        return await this.restaurantService.deleteRestaurant(parseInt(id));
      });
    });
  }

  public get() {
    return this.router.bind(this);
  }
}
