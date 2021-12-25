export const TYPES = {
  // infrastructure types 
  Logger: Symbol.for('Logger'),
  MariaDB: Symbol.for('MariaDB'),
  Server: Symbol.for('Server'),

  // domain types
  UserRouter: Symbol.for('UserRouter'),
  UserService: Symbol.for('UserService'),

  // common types
  ApiResponse: Symbol.for('ApiResponse'),

  // error types
  ErrorGenerator: Symbol.for('ErrorGenerator')
};
