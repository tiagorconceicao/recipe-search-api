import axios, { AxiosInstance } from 'axios';
import AppError from '../../errors/AppError';
import { IRecipe, IRecipeProvider } from '../IRecipeProvider';

interface RecipePuppyResults {
  title: string;
  ingredients: string;
  href: string;
}
interface RecipePuppyResponse {
  results: RecipePuppyResults[];
}

class RecipePuppyRecipeProvider implements IRecipeProvider {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://www.recipepuppy.com/api',
    });
  }

  async findByIngredients(ingredients: string[]): Promise<IRecipe[]> {
    try {
      const { data } = await this.api.get<RecipePuppyResponse>('/', {
        params: { i: ingredients.join(',') },
      });

      return data.results.map(recipe => ({
        title: recipe.title,
        ingredients: recipe.ingredients
          .split(',')
          .map(item => item.trim())
          .sort(),
        link: recipe.href,
      }));
    } catch (err) {
      console.log(err.message);
      throw new AppError('"Recipe Puppy" API is unavailable.', 503);
    }
  }
}

export default RecipePuppyRecipeProvider;
