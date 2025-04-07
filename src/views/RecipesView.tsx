"use client";

import React, { useState, useEffect } from "react";
// import React, { useContext } from "react";
import { Typography, Box, Grid, Container, Pagination } from "@mui/material";
import AppHeader from "@/components/AppHeader";
// import { useRouter } from "next/navigation";
import RecipeCard from "@/components/RecipeCard";
import { useRecipes } from "@/context/RecipeContext";
import { useFavorites } from "@/context/FavoritesContext";
import { SearchBar } from "@/components/SearchBar";

type difficultyLevels = "hard" | "moderate" | "easy";
interface Recipe {
  id: number;
  name: string;
  prep_time: string;
  category: string;
  ingredients: string[];
  dietary: string[];
  season: string;
  cuisine: string;
  difficulty: difficultyLevels;
  images: string[];
  steps: string[];
  story: string;
}

interface SearchQuery {
  target: string; //this is the name or ingredient of the recipe
  maxTime: number;
  maxDifficulty: difficultyLevels;
  filters: string[];
}

//initialize the recipes object array

export function RecipesView() {
  // const router = useRouter();
  const [displayFavorites, setDisplayFavorites] = useState<Boolean>(false);
  const { recipes } = useRecipes();
  const { isFavorite } = useFavorites();
  const [searchResults, setSearchResults] = useState(recipes);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    target: "",
    maxTime: 60,
    maxDifficulty: "hard",
    filters: [],
  });

  const recipesPerPage: number = 9;

  const pageCount = Math.max(
    Math.ceil(searchResults.length / recipesPerPage),
    1
  ); //divides and rounds up

  const paginatedRecipes = searchResults.filter(
    (_, index) =>
      index >= (pageNumber - 1) * recipesPerPage &&
      index < pageNumber * recipesPerPage //pageNumber starts at 1, indexing starts at 0.
  );

  const timeToMin = (time: string) => {
    const inHours = time.includes("hr") || time.includes("hour");
    return inHours ? 60 : parseInt(time);
  };

  function search() {
    console.log("Applying search criteria");
    const target = searchQuery.target.toLowerCase();
    //search by the name, prep_time, cuisine, dietary[], seasonal, category, and ingredients[]
    //searches all the recipes
    const filters = searchQuery.filters;

    let filterByCuisine = false;
    let filterBySeason = false;
    let filterByMeal = false;
    let filterByDiet = false;

    const seasons = ["winter", "summer", "autumn", "spring"];
    const cuisines = ["italian", "thai", "american"];
    const meals = [
      "breakfast",
      "lunch",
      "dinner",
      "snacks",
      "beverage",
      "desserts",
    ];
    const diets = ["gluten-free", "vegetarian"];
    for (const index in filters) {
      const filter = filters[index];
      if (seasons.includes(filter.toLowerCase())) filterBySeason = true;
      if (cuisines.includes(filter.toLowerCase())) filterByCuisine = true;
      if (meals.includes(filter.toLowerCase())) filterByMeal = true;
      if (diets.includes(filter.toLowerCase())) filterByDiet = true;
    }
    console.log(filterByCuisine, filterBySeason, filterByMeal, filterByDiet);
    console.log(filters);

    filters.includes("");

    const searchResults = recipes.filter((recipe) => {
      const containsTarget =
        recipe.name?.toLowerCase().includes(target) ||
        recipe.ingredients?.some((i) => i.toLowerCase().includes(target));

      //if we aren't filtering, it's in season
      const inSeason = !filterBySeason || filters.includes(recipe.season);
      const inDiet =
        !filterByDiet ||
        filters.includes(recipe.dietary[0] || "default") ||
        filters.includes(recipe.dietary[1] || "default");
      const inCuisine = !filterByCuisine || filters.includes(recipe.cuisine);
      const inMeal = !filterByMeal || filters.includes(recipe.category);
      const inFavorites = !displayFavorites || isFavorite(recipe.id);
      const inTime = timeToMin(recipe.prep_time) <= searchQuery.maxTime;

      const difficultyMap = {
        hard: 3,
        moderate: 2,
        easy: 1,
      };
      const inDifficulty =
        difficultyMap[
          recipe.difficulty.toLowerCase() as "hard" | "moderate" | "easy"
        ] <= difficultyMap[searchQuery.maxDifficulty];
      return (
        containsTarget &&
        inSeason &&
        inDiet &&
        inCuisine &&
        inMeal &&
        inTime &&
        inDifficulty &&
        inFavorites
      );
    });
    
    setPageNumber(1);
    setSearchResults(searchResults);
  }

  // This has to be done with useEffect because if done in the toggle display favorites, it's backwards.
  // I think the set call doesn't run immediately so it searches with a previous version of the favorites value
  useEffect(() => {
    search();
  }, [displayFavorites]);

  return (
    <Box>
      {/* Navbar */}
      <AppHeader />

      <Container>
        {/* All Recipes Section */}
        <Box sx={{ padding: "20px" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "space-between",
              marginBottom: 3,
              marginTop: 1,
            }}
          >
            <Typography variant="h3">All Recipes</Typography>

            {/* Search Bar */}
            <Box>
              <SearchBar
                query={searchQuery}
                setSearchQuery={setSearchQuery}
                displayFavorites={displayFavorites}
                toggleDisplayFavorites={() =>
                  setDisplayFavorites(!displayFavorites)
                }
                search={search}
              />
            </Box>
          </Box>

          {/* Recipe Grid */}
          <Grid container spacing={3}>
            {paginatedRecipes.length === 0 ? (
              <Typography variant="h6" sx={{ mt: 2, mb: 3, ml: 3, mr: 3 }}>
                No results, try broadening your search
              </Typography>
            ) : null}

            {paginatedRecipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Pagination
              count={pageCount}
              size="large"
              color="primary"
              shape="rounded"
              page={pageNumber}
              onChange={(e: React.ChangeEvent<unknown>, page: number) => {
                setPageNumber(page);
              }}
              sx={{ mt: 4 }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
