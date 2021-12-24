import { Router } from 'express';

export interface IHttpRouter {
  init: () => void;
  get: () => Router;
}