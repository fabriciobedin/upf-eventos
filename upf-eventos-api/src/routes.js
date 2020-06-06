import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Wolrd' });
});

routes.use(authMiddleware);
// as rotas abaixo deste middleware serão privadas

export default routes;
