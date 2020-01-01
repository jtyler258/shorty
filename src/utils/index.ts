import {
  Router,
  Request,
  Response,
  NextFunction
} from 'express';
import validUrl from 'valid-url';
import {
  HOSTED_DOMAIN,
  HOSTED_PORT,
  HOSTED_PROTOCOL
} from './config';

type Wrapper = ((router: Router) => void);

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string,
  method: string;
  handler: Handler | Handler[];
};

export const applyMiddleware = (
  middleware: Wrapper[],
  router: Router
) => {
  for (const f of middleware) {
    f(router);
  }
};

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    (router as any)[method](path, handler);
  }
}

export const buildUrl = (id: string): string => {
  return [
    `${ HOSTED_PROTOCOL }://`,
    `${ HOSTED_DOMAIN }`,
    `${ HOSTED_PORT ? ":" + HOSTED_PORT : "" }`,
    `/${ id }`
  ].join('');
}

export const sanitizeUrl = (url: string): string => {
  return validUrl.isWebUri(url);
}