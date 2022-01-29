export const TYPES = {
  // Infrastructure
  Logger: Symbol.for('Logger'),
  MariaDB: Symbol.for('MariaDB'),
  Server: Symbol.for('Server'),
  MorganLogger: Symbol.for('MorganLogger'),
  AWSS3: Symbol.for('AWSS3'),

  // Common
  ApiResponse: Symbol.for('ApiResponse'),

  // User
  HealthCheckRouter: Symbol.for('HealthCheckRouter'),
  UserRouter: Symbol.for('UserRouter'),
  UserService: Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository'),
};
