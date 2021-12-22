const DEFAULT_PORT = 3000;

interface IServerConfig {
  port: number;
}

export const serverConfig: IServerConfig = {
  port: parseInt(process.env.PORT) || DEFAULT_PORT,
};
