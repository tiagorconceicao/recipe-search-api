import request from 'supertest';
import app from '../../app';

let response: request.Response;
let keywords: any;
let recipes: any[];
let recipe: any;

describe('Search Recipes', () => {
  beforeAll(async () => {
    response = await request(app).get('/recipes/?i=garlic,bread,butter,salt');
    keywords = response.body.keywords;
    recipes = response.body.recipes;
    [recipe] = response.body.recipes;
  });

  it('should be able to capture only 3 ingredients from query', async () => {
    expect(JSON.stringify(response.body.keywords)).toBe(
      JSON.stringify(['garlic', 'bread', 'butter']),
    );
  });

  it('should be able return the keywords: string[]', async () => {
    const [keyword] = keywords;
    expect(typeof keywords).toBe('object');
    expect(typeof keyword).toBe('string');
  });

  it('should be able return the recipe title: string', async () => {
    expect(typeof recipe.title).toBe('string');
  });

  it('should be able return the recipe ingredients: string[]', async () => {
    const [ingredient] = recipe.ingredients;
    expect(typeof recipe.ingredients).toBe('object');
    expect(typeof ingredient).toBe('string');
  });

  it('should be able return the recipe ingredients sorted alphabetically', async () => {
    recipes.map(rec => {
      const { ingredients } = rec;
      expect(JSON.stringify(ingredients)).toBe(
        JSON.stringify(ingredients.sort()),
      );
      return rec;
    });
  });

  it('should be able return the recipe link: string', async () => {
    expect(typeof recipe.link).toBe('string');
  });

  it('should be able return the recipe gif: string', async () => {
    expect(typeof recipe.gif).toBe('string');
  });
});
