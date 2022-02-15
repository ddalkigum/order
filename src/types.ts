export const TYPES = {
  // Infrastructure
  WinstonLogger: Symbol.for('WinstonLogger'),
  Server: Symbol.for('Server'),
  MorganLogger: Symbol.for('MorganLogger'),
  MariaDB: Symbol.for('MariaDB'),
  RedisDB: Symbol.for('RedisDB'),
  KakaoService: Symbol.for('KakaoService'),

  // Common
  ApiResponse: Symbol.for('ApiResponse'),

  // User
  UserRouter: Symbol.for('UserRouter'),
  UserService: Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository'),

  // Store
  StoreRouter: Symbol.for('StoreRouter'),
  StoreService: Symbol.for('StoreService'),
  StoreRepository: Symbol.for('StoreRepository'),

  // Dev seed
  DevRouter: Symbol.for('DevRouter'),
  Seed: Symbol.for('Seed'),
};
