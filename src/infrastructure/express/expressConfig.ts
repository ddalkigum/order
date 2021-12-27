const DEFAULT_PORT = 3030;

interface IServerConfig {
  port: number;
}

export const serverConfig: IServerConfig = {
  port: parseInt(process.env.PORT) || DEFAULT_PORT,
};
