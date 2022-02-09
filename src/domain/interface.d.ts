export interface IHttpRouter {
  init: () => void;
  get: () => Router;
}

export type JWT = string;
