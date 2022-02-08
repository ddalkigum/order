export const TYPES = {
  // Infrastructure
  Logger: Symbol.for('Logger'),
  Server: Symbol.for('Server'),
  MorganLogger: Symbol.for('MorganLogger'),
  MariaDB: Symbol.for('MariaDB'),
  MongoDB: Symbol.for('MongoDB'),

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
};
