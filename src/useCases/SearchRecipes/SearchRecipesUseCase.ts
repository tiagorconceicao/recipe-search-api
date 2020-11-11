import { IGifProvider } from '../../providers/IGifProvider';
import { IRecipeProvider } from '../../providers/IRecipeProvider';
import { ISearchRecipesRequestDTO } from './SearchRecupesDTO';

interface IRecipe {
  title: string;
  ingredients: string[];
  link: string;
  gif: string | null;
}

interface IResponse {
  keywords: string[];
  recipes: IRecipe[];
}

class SearchRecipeUseCase {
  private recipeProvider: IRecipeProvider;

  private gifProvider: IGifProvider;

  constructor(recipeProvider: IRecipeProvider, gifProvider: IGifProvider) {
    this.recipeProvider = recipeProvider;
    this.gifProvider = gifProvider;
  }

  async execute(data: ISearchRecipesRequestDTO): Promise<IResponse> {
    const keywords = data.ingredients.split(',', 3);

    const basicRecipes = await this.recipeProvider.findByIngredients(keywords);

    const recipes = await Promise.all(
      basicRecipes.map(async recipe => {
        const gif = await this.gifProvider.findOne(recipe.title);

        return {
          ...recipe,
          gif: gif.url,
        };
      }),
    );

    return {
      keywords,
      recipes,
    };
  }
}

export default SearchRecipeUseCase;
