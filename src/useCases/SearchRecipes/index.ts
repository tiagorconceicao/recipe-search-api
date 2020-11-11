import GiphyGifProvider from '../../providers/implementations/GiphyGifProvider';
import RecipePuppyRecipeProvider from '../../providers/implementations/RecipePuppyRecipeProvider';
import SearchRecipesController from './SearchRecipesControler';
import SearchRecipeUseCase from './SearchRecipesUseCase';

const recipePuppyRecipeProvider = new RecipePuppyRecipeProvider();
const giphyGifProvider = new GiphyGifProvider();

const searchRecipeUseCase = new SearchRecipeUseCase(
  recipePuppyRecipeProvider,
  giphyGifProvider,
);

const searchRecipesController = new SearchRecipesController(
  searchRecipeUseCase,
);

export { searchRecipeUseCase, searchRecipesController };
