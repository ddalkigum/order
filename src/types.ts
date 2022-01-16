export const TYPES = {
  // Infrastructure 
  Logger: Symbol.for('Logger'),
  MariaDB: Symbol.for('MariaDB'),
  Server: Symbol.for('Server'),

  // Common 
  ApiResponse: Symbol.for('ApiResponse'),

  // User 
  UserRouter: Symbol.for('UserRouter'),
  UserService: Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository'),
};
