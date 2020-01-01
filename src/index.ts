import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import routes from './resources';

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);

const server = http.createServer(router);

const { PORT = 3000 } = process.env;
server.listen(PORT);