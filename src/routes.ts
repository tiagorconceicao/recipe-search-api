import { Router } from 'express';
import { searchRecipesController } from './useCases/SearchRecipes';

const routes = Router();

routes.get('/recipes', (request, response) => {
  return searchRecipesController.handle(request, response);
});

export default routes;
