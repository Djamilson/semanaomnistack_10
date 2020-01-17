import { Router } from 'express';

import DevController from './app/controllers/DevController';
import SearchController from './app/controllers/SearchController';
import DevStore from './app/validators/DevStore';

const routes = new Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevStore, DevController.store);

routes.get('/search', SearchController.index);

export default routes;
