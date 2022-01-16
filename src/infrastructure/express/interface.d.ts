export interface IServer {
  set: () => void;
  start: (port: number) => void;
}
