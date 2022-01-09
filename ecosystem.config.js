module.exports = {
  apps: [
    {
      name: 'orders',
      script: './src/server.ts',
      instances: '1',
      exec_mode: 'cluster',
      env_development: {
        NODE_ENV: 'development',
      }
    }
  ]
}