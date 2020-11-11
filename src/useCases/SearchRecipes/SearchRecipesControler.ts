import { Request, Response } from 'express';
import SearchRecipeUseCase from './SearchRecipesUseCase';

class SearchRecipesController {
  private searchRecipesUseCase: SearchRecipeUseCase;

  constructor(searchRecipesUseCase: SearchRecipeUseCase) {
    this.searchRecipesUseCase = searchRecipesUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const ingredients = request.query.i as string;

    const data = await this.searchRecipesUseCase.execute({ ingredients });

    return response.json(data);
  }
}

export default SearchRecipesController;
