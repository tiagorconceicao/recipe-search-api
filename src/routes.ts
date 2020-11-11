import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({ server_running: true });
});

export default routes;
