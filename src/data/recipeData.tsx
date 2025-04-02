import stories from "@/../public/complete_recipes/All_recipe_stories.json";
import appetizers from "@/../public/complete_recipes/appetizer_recipes.json";
import autumn from "@/../public/complete_recipes/autumn_recipes.json";
import beverages from "@/../public/complete_recipes/beverages_recipes.json";
import breakfast1 from "@/../public/complete_recipes/breakfast_recipes_part1.json";
import breakfast2 from "@/../public/complete_recipes/breakfast_recipes_part2.json";
import breakfast3 from "@/../public/complete_recipes/breakfast_recipes_part3.json";
import desserts1 from "@/../public/complete_recipes/dessert_recipes_part1.json";
import desserts2 from "@/../public/complete_recipes/dessert_recipes_part2.json";
import dinner1 from "@/../public/complete_recipes/dinner_recipes_part1.json";
import dinner2 from "@/../public/complete_recipes/dinner_recipes_part2.json";
import lunch1 from "@/../public/complete_recipes/lunch_recipes_part1.json";
import lunch2 from "@/../public/complete_recipes/lunch_recipes_part2.json";
import snacks from "@/../public/complete_recipes/snacks_recipes.json";
import spring from "@/../public/complete_recipes/spring_recipes.json";
import summer from "@/../public/complete_recipes/summer_recipes.json";
import winter from "@/../public/complete_recipes/winter_recipes.json";

interface Recipe {
  id: number;
  name: string;
  prep_time: string;
  category: string;
  ingredients: string[];
  dietary: string[];
  season: string;
  cuisine: string;
  difficulty: string;
  images: string[];
  steps: string[];
  story: string;
}

interface RecipeStory {
  id: number;
  story: string;
}

// Process and combine all recipes (similar to what RecipeContext does)
export function getAllRecipes() {
  const allRecipes: Recipe[] = [];

  stories.forEach((story) => {
    const recipeStory = { id: story.id, story: story.story };

    // Search all recipe collections for matches
    const recipeCollections = [
      appetizers,
      autumn,
      beverages,
      breakfast1,
      breakfast2,
      breakfast3,
      desserts1,
      desserts2,
      dinner1,
      dinner2,
      lunch1,
      lunch2,
      snacks,
      winter,
      summer,
      spring,
    ];

    // Find the first matching recipe in any collection
    const matchedRecipe = recipeCollections
      .flatMap((collection) =>
        collection.filter((r) => r.id === recipeStory.id)
      )
      .find(Boolean);

    if (matchedRecipe) {
      allRecipes.push({
        ...matchedRecipe,
        story: recipeStory.story,
      });
    }
  });

  return allRecipes;
}

// Export all recipes for direct import
export const allRecipes = getAllRecipes();
