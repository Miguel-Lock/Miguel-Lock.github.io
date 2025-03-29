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
import stories from "@/../public/recipes/All_recipe_stories.json";
import appetizers from "@/../public/recipes/appetizer_recipes.json";
import autumn from "@/../public/recipes/autumn_recipes.json";
import beverages from "@/../public/recipes/beverages_recipes.json";
import breakfast1 from "@/../public/recipes/breakfast_recipes_part1.json";
import breakfast2 from "@/../public/recipes/breakfast_recipes_part2.json";
import breakfast3 from "@/../public/recipes/breakfast_recipes_part3.json";
import desserts1 from "@/../public/recipes/dessert_recipes_part1.json";
import desserts2 from "@/../public/recipes/dessert_recipes_part2.json";
import dinner1 from "@/../public/recipes/dinner_recipes_part1.json";
import dinner2 from "@/../public/recipes/dinner_recipes_part2.json";
import lunch1 from "@/../public/recipes/lunch_recipes_part1.json";
import lunch2 from "@/../public/recipes/lunch_recipes_part2.json";
import snacks from "@/../public/recipes/snacks_recipes.json";
import spring from "@/../public/recipes/spring_recipes.json";
import summer from "@/../public/recipes/summer_recipes.json";
import winter from "@/../public/recipes/winter_recipes.json";

interface Recipe {
  id: number;
  name?: string;
  prep_time?: string;
  category?: string;
  ingredients?: string[];
  dietary?: string[];
  season?: string;
  cuisine?: string;
  difficulty?: string;
  images?: string[];
  steps?: string[];
  story: string;
}

const allRecipes: Recipe[] = [];
let typingTimer: ReturnType<typeof setTimeout>;

const doneTypingInterval = 500;

//initialize the recipes object array
stories.forEach((story) => {
  let recipe: Recipe = { id: story.id, story: story.story };

  const apps = appetizers.filter((recipes) => recipes.id === recipe.id);
  if (apps.length > 0) recipe = { ...recipe, ...apps[0] };
  const aut = autumn.filter((recipes) => recipes.id === recipe.id);
  if (aut.length > 0) recipe = { ...recipe, ...aut[0] };

  const bev = beverages.filter((recipes) => recipes.id === recipe.id);
  if (bev.length > 0) recipe = { ...recipe, ...bev[0] };

  const break1 = breakfast1.filter((recipes) => recipes.id === recipe.id);
  if (break1.length > 0) recipe = { ...recipe, ...break1[0] };

  const break2 = breakfast2.filter((recipes) => recipes.id === recipe.id);
  if (break2.length > 0) recipe = { ...recipe, ...break2[0] };

  const break3 = breakfast3.filter((recipes) => recipes.id === recipe.id);
  if (break3.length > 0) recipe = { ...recipe, ...break3[0] };

  const dess1 = desserts1.filter((recipes) => recipes.id === recipe.id);
  if (dess1.length > 0) recipe = { ...recipe, ...dess1[0] };

  const dess2 = desserts2.filter((recipes) => recipes.id === recipe.id);
  if (dess2.length > 0) recipe = { ...recipe, ...dess2[0] };

  const din1 = dinner1.filter((recipes) => recipes.id === recipe.id);
  if (din1.length > 0) recipe = { ...recipe, ...din1[0] };

  const din2 = dinner2.filter((recipes) => recipes.id === recipe.id);
  if (din2.length > 0) recipe = { ...recipe, ...din2[0] };

  const lun1 = lunch1.filter((recipes) => recipes.id === recipe.id);
  if (lun1.length > 0) recipe = { ...recipe, ...lun1[0] };

  const lun2 = lunch2.filter((recipes) => recipes.id === recipe.id);
  if (lun2.length > 0) recipe = { ...recipe, ...lun2[0] };

  const snk = snacks.filter((recipes) => recipes.id === recipe.id);
  if (snk.length > 0) recipe = { ...recipe, ...snk[0] };

  const win = winter.filter((recipes) => recipes.id === recipe.id);
  if (win.length > 0) recipe = { ...recipe, ...win[0] };

  const sum = summer.filter((recipes) => recipes.id === recipe.id);
  if (sum.length > 0) recipe = { ...recipe, ...sum[0] };

  const spr = spring.filter((recipes) => recipes.id === recipe.id);
  if (spr.length > 0) recipe = { ...recipe, ...spr[0] };

  allRecipes.push(recipe);
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
