"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import AppHeader from "@/components/AppHeader";
// import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RecipeCard from "@/components/RecipeCard";
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

const allRecipes: Recipe[] = [];
let typingTimer: ReturnType<typeof setTimeout>;

const doneTypingInterval = 500;

//initialize the recipes object array
stories.forEach((story) => {
  let recipeStory: RecipeStory = { id: story.id, story: story.story };
  let fullRecipe: Recipe = {
    id: 0,
    name:"string",
    prep_time: "string",
    category: "string",
    ingredients: ["string"],
    dietary: ["string"],
    season: "string",
    cuisine: "string",
    difficulty: "string",
    images: ["string"],
    steps: ["string"],
    story: "string"
  };

  const apps = appetizers.filter((recipes) => recipes.id === recipeStory.id);
  if (apps.length > 0) fullRecipe =  { ...recipeStory, ...apps[0] };
  
  const aut = autumn.filter((recipes) => recipes.id === recipeStory.id);
  if (aut.length > 0) fullRecipe =  { ...recipeStory, ...aut[0] };

  const bev = beverages.filter((recipes) => recipes.id === recipeStory.id);
  if (bev.length > 0) fullRecipe =  { ...recipeStory, ...bev[0] };

  const break1 = breakfast1.filter((recipes) => recipes.id === recipeStory.id);
  if (break1.length > 0) fullRecipe =  { ...recipeStory, ...break1[0] };

  const break2 = breakfast2.filter((recipes) => recipes.id === recipeStory.id);
  if (break2.length > 0) fullRecipe =  { ...recipeStory, ...break2[0] };

  const break3 = breakfast3.filter((recipes) => recipes.id === recipeStory.id);
  if (break3.length > 0) fullRecipe =  { ...recipeStory, ...break3[0] };

  const dess1 = desserts1.filter((recipes) => recipes.id === recipeStory.id);
  if (dess1.length > 0) fullRecipe =  { ...recipeStory, ...dess1[0] };

  const dess2 = desserts2.filter((recipes) => recipes.id === recipeStory.id);
  if (dess2.length > 0) fullRecipe =  { ...recipeStory, ...dess2[0] };

  const din1 = dinner1.filter((recipes) => recipes.id === recipeStory.id);
  if (din1.length > 0) fullRecipe =  { ...recipeStory, ...din1[0] };

  const din2 = dinner2.filter((recipes) => recipes.id === recipeStory.id);
  if (din2.length > 0) fullRecipe =  { ...recipeStory, ...din2[0] };

  const lun1 = lunch1.filter((recipes) => recipes.id === recipeStory.id);
  if (lun1.length > 0) fullRecipe =  { ...recipeStory, ...lun1[0] };

  const lun2 = lunch2.filter((recipes) => recipes.id === recipeStory.id);
  if (lun2.length > 0) fullRecipe =  { ...recipeStory, ...lun2[0] };

  const snk = snacks.filter((recipes) => recipes.id === recipeStory.id);
  if (snk.length > 0) fullRecipe =  { ...recipeStory, ...snk[0] };

  const win = winter.filter((recipes) => recipes.id === recipeStory.id);
  if (win.length > 0) fullRecipe =  { ...recipeStory, ...win[0] };

  const sum = summer.filter((recipes) => recipes.id === recipeStory.id);
  if (sum.length > 0) fullRecipe =  { ...recipeStory, ...sum[0] };

  const spr = spring.filter((recipes) => recipes.id === recipeStory.id);
  if (spr.length > 0) fullRecipe =  { ...recipeStory, ...spr[0] };

  allRecipes.push(fullRecipe);
});

const search = (target: string, recipes: Recipe[]) => {
  target = target.toLowerCase();
  //search by the name, prep_time, cuisine, dietary[], seasonal, and ingredients[]

  return recipes.filter((recipe) => {
    return (
      recipe.name?.toLowerCase().includes(target) ||
      recipe.ingredients?.some((i) => i.toLowerCase().includes(target)) ||
      recipe.prep_time?.toLowerCase().includes(target) ||
      recipe.cuisine?.toLowerCase().includes(target) ||
      recipe.dietary?.some((d) => d.toLowerCase().includes(target)) ||
      recipe.season?.toLowerCase().includes(target)
    );
  });
};

export function RecipesView() {
  // const router = useRouter();

  const [recipes, setRecipes] = useState(allRecipes);

  //waits for 1s since the user stops typing to search
  const optimizedSearch = (target: string) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(
      () => setRecipes(search(target, allRecipes)),
      doneTypingInterval
    );
  };

  return (
    <Box>
      {/* Navbar */}
      <AppHeader />

      <Container>
        {/* All Recipes Section */}
        <Box sx={{ padding: "20px" }}>
          <Typography variant="h4">All Recipes</Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "20px",
            }}
          >
            <TextField
              placeholder="Search Recipes"
              variant="outlined"
              sx={{ width: "300px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <FilterListIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                optimizedSearch(e.target.value);
              }}
            />
          </Box>

          {/* Recipe Grid */}
          <Grid container spacing={3}>
            {recipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
