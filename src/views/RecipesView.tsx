"use client";

import React, { useState, useEffect } from "react";
// import React, { useContext } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Container,
  Pagination,
} from "@mui/material";
import AppHeader from "@/components/AppHeader";
// import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RecipeCard from "@/components/RecipeCard";
import { useRecipes } from "@/context/RecipeContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useFavorites } from "@/context/FavoritesContext";

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
  const [displayFavorites, setDisplayFavorites] = useState(false);
  const { recipes } = useRecipes();
  const { isFavorite } = useFavorites();
  const [searchedRecipes, setSearchedRecipes] = useState(recipes);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTarget, setSearchTarget] = useState("");

  const recipesPerPage = 9;

  const pageCount = Math.max(
    Math.ceil(searchedRecipes.length / recipesPerPage),
    1
  ); //divides and rounds up
  const paginatedRecipes = searchedRecipes.filter(
    (_, index) =>
      index >= (pageNumber - 1) * recipesPerPage &&
      index < pageNumber * recipesPerPage //pageNumber starts at 1, indexing starts at 0.
  );

  //waits for .5s since the user stops typing to search
  const delayedSearch = (target: string) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(
      () => setSearchedRecipes(search(target, recipes)),
      doneTypingInterval
    );
  };

  function updateSearch(recipes: Recipe[]) {
    return search(searchTarget, recipes);
  }

  function search(target: string, recipes: Recipe[]) {
    target = target.toLowerCase();
    //search by the name, prep_time, cuisine, dietary[], seasonal, category, and ingredients[]

    return recipes.filter((recipe) => {
      return (
        (recipe.name?.toLowerCase().includes(target) ||
          recipe.ingredients?.some((i) => i.toLowerCase().includes(target)) ||
          recipe.prep_time?.toLowerCase().includes(target) ||
          recipe.cuisine?.toLowerCase().includes(target) ||
          recipe.dietary?.some((d) => d.toLowerCase().includes(target)) ||
          recipe.season?.toLowerCase().includes(target) ||
          recipe.category?.toLowerCase().includes(target)) &&
        (isFavorite(recipe.id) || !displayFavorites) //will display only favorites if set to that
      );
    });
  }

  useEffect(() => {
    setSearchedRecipes(updateSearch(recipes));
  }, [displayFavorites]);

  const toggleDisplayFavorites = (
    e: React.MouseEvent<unknown>,
    selected: string
  ) => {
    if (selected === null) {
      setDisplayFavorites(!displayFavorites);
    } else {
      setDisplayFavorites(selected === "fav");
    }
  };

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
              <ToggleButtonGroup
                value={displayFavorites ? "fav" : "all"}
                exclusive
                onChange={toggleDisplayFavorites}
                aria-label="Platform"
                color="primary"
                sx={{ mr: 2, mb: 3, alignItems: "center" }}
              >
                <ToggleButton value="all" defaultChecked>
                  All Recipes
                </ToggleButton>
                <ToggleButton value="fav">Favorites</ToggleButton>
              </ToggleButtonGroup>

              <TextField
                placeholder="Search Recipes"
                variant="outlined"
                value={searchTarget}
                sx={{ width: "300px" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <FilterListIcon
                            sx={{
                              color: (theme) => theme.palette.text.primary,
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon
                          sx={{ color: (theme) => theme.palette.text.primary }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchTarget(e.target.value);
                  delayedSearch(e.target.value);
                }}
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
              onChange={(e: React.ChangeEvent<unknown>, page: number) =>
                setPageNumber(page)
              }
              sx={{ mt: 4 }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
