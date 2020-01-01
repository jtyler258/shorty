import healthRoutes from './health/routes';
import urlRoutes from './urls/routes';

export default [
  ...healthRoutes,
  ...urlRoutes
]