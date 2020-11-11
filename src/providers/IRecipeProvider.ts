export interface IRecipe {
  title: string;
  ingredients: string[];
  link: string;
}

export interface IRecipeProvider {
  findByIngredients(ingredients: string[]): Promise<IRecipe[]>;
}
