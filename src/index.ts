import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import { PORT } from './utils/config';
import middleware from './middleware';
import routes from './resources';

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);

const server = http.createServer(router);

const port = Number.parseInt(PORT);
server.listen(port);