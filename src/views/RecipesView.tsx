"use client";

import React, { useContext, useState } from "react";
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
import { useRecipes } from "@/context/RecipeContext";

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

let typingTimer: ReturnType<typeof setTimeout>;
const doneTypingInterval = 500;

//initialize the recipes object array

export function RecipesView() {
  // const router = useRouter();
  const { recipes } = useRecipes();
  const [displayedRecipes, setDisplayedRecipes] = useState(recipes);

  //waits for .5s since the user stops typing to search
  const delayedSearch = (target: string) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(
      () => setDisplayedRecipes(search(target, recipes)),
      doneTypingInterval
    );
  };

  const search = (target: string, recipes: Recipe[]) => {
    target = target.toLowerCase();
    //search by the name, prep_time, cuisine, dietary[], seasonal, category, and ingredients[]

    return recipes.filter((recipe) => {
      return (
        recipe.name?.toLowerCase().includes(target) ||
        recipe.ingredients?.some((i) => i.toLowerCase().includes(target)) ||
        recipe.prep_time?.toLowerCase().includes(target) ||
        recipe.cuisine?.toLowerCase().includes(target) ||
        recipe.dietary?.some((d) => d.toLowerCase().includes(target)) ||
        recipe.season?.toLowerCase().includes(target) ||
        recipe.category?.toLowerCase().includes(target)
      );
    });
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
              slotProps={{
                input: {
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
                },
              }}
              onChange={(e) => {
                delayedSearch(e.target.value);
              }}
            />
          </Box>

          {/* Recipe Grid */}
          <Grid container spacing={3}>
            {displayedRecipes.map((recipe, index) => (
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
