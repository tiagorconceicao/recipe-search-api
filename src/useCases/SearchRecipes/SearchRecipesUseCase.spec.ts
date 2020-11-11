/* eslint-disable max-classes-per-file */
import { IGif, IGifProvider } from '../../providers/IGifProvider';
import { IRecipe, IRecipeProvider } from '../../providers/IRecipeProvider';
import SearchRecipeUseCase from './SearchRecipesUseCase';

// Create Test Providers
class TestRecipeProvider implements IRecipeProvider {
  private recipes = [
    {
      title: 'Easy No Salt Garlic Croutons',
      ingredients: ['bread', 'butter', 'garlic', 'olive oil'],
      link: 'http://www.recipezaar.com/Easy-No-Salt-Garlic-Croutons-344616',
    },
    {
      title: 'Simplest Garlic Bread',
      ingredients: ['bread', 'butter', 'garlic', 'parsley'],
      link: 'http://www.recipezaar.com/Simplest-Garlic-Bread-347333',
    },
    {
      title: 'Texas Toast, Ala Emeril',
      ingredients: ['bread', 'butter', 'cajun seasoning', 'garlic', 'parsley'],
      link: 'http://www.recipezaar.com/Texas-Toast-Ala-Emeril-92806',
    },
  ];

  async findByIngredients(): Promise<IRecipe[]> {
    return this.recipes;
  }
}

class TestGifProvider implements IGifProvider {
  private gif = {
    url: 'https://media.giphy.com/media/Q4PcMC8apFXBm/giphy.gif',
  };

  async findOne(): Promise<IGif> {
    return this.gif;
  }
}

const testRecipeProvider = new TestRecipeProvider();
const testGifProvider = new TestGifProvider();

const searchRecipeUseCase = new SearchRecipeUseCase(
  testRecipeProvider,
  testGifProvider,
);

/**
 * UseCase tests
 */
describe('Search Recipes | useCase', () => {
  let ingredientsString: string;
  let response: any;
  let keywords: any;
  let recipes: any[];
  let recipe: any;

  beforeAll(async () => {
    ingredientsString = 'garlic,bread,butter,salt';
    response = await searchRecipeUseCase.execute({
      ingredients: ingredientsString,
    });
    keywords = response.keywords;
    recipes = response.recipes;
    [recipe] = recipes;
  });

  it('should be able to capture only the first 3 ingredients', async () => {
    expect(JSON.stringify(response.keywords)).toBe(
      JSON.stringify(['garlic', 'bread', 'butter']),
    );
  });

  it('should be able return the keywords', async () => {
    expect(keywords).toStrictEqual(['garlic', 'bread', 'butter']);
  });

  it('should be able return the recipe title', async () => {
    expect(recipe.title).toStrictEqual('Easy No Salt Garlic Croutons');
  });

  it('should be able return the recipe ingredients', async () => {
    expect(recipe.ingredients).toStrictEqual([
      'bread',
      'butter',
      'garlic',
      'olive oil',
    ]);
  });

  it('should be able return the recipe link', async () => {
    expect(recipe.link).toStrictEqual(
      'http://www.recipezaar.com/Easy-No-Salt-Garlic-Croutons-344616',
    );
  });

  it('should be able return the recipe gif', async () => {
    expect(recipe.gif).toStrictEqual(
      'https://media.giphy.com/media/Q4PcMC8apFXBm/giphy.gif',
    );
  });
});
