"use client";
import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Card,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AppHeader from "@/components/AppHeader";
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

export function DirectionsView(props: any) {
  const { recipes } = useRecipes();

  const displayedRecipe: Recipe = recipes.filter(
    (recipe) => recipe.id === props.recipeID
  )[0];

  const [image, setImage] = useState(0);
  const [readMore, setReadMore] = useState(false);

  return (
    <Box>
      {/* Header */}
      <AppHeader />

      {/* Main Content */}
      <Container sx={{ display: "flex", marginTop: 4 }}>
        {/* Left Section */}
        <Box flex={2} sx={{ paddingRight: 4 }}>
          <Typography variant="h3" fontWeight="bold">
            {displayedRecipe.name} <FavoriteBorderIcon fontSize="small" />
          </Typography>

          {/* Tags */}
          <Box sx={{ display: "flex", gap: 1, marginY: 2 }}>
            <Chip
              label={displayedRecipe.prep_time}
              variant="outlined"
              sx={{ bgcolor: "primary.main" }}
            />
            <Chip
              label={displayedRecipe.category}
              variant="outlined"
              sx={{ bgcolor: "primary.main" }}
            />
            <Chip
              label={displayedRecipe.cuisine}
              variant="outlined"
              sx={{ bgcolor: "primary.main" }}
            />
            <Chip
              label={displayedRecipe.difficulty}
              variant="outlined"
              sx={{ bgcolor: "primary.main" }}
            />
          </Box>

          <Typography
            sx={
              !readMore
                ? {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                  }
                : undefined
            }
          >
            {displayedRecipe.story}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{ marginY: 2 }}
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "READ LESS" : "READ MORE"}
          </Button>

          {/* Directions */}
          <Typography variant="h5" fontWeight="bold">
            Directions:
          </Typography>
          <Typography component="ol">
            {displayedRecipe.steps.map((step, index) => (
              <li key={"step-" + index}>{step}</li>
            ))}
          </Typography>
        </Box>

        {/* Right Section */}
        <Box
          flex={1}
          sx={{ textAlign: "center", bgcolor: "primary.main", padding: 2 }}
        >
          <Box sx={{ flexDirection: "row", gap: 2 }}>
            <IconButton
              onClick={() =>
                setImage(
                  (image + displayedRecipe.images.length - 1) %
                    displayedRecipe.images.length
                )
              }
            >
              <ArrowBackIosIcon />
            </IconButton>

            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <img
                src={"/image_files/" + displayedRecipe.images[image]}
                alt="Caprese Skewers"
                style={{ width: "100%" }}
              />
            </Card>

            <IconButton
              onClick={() =>
                setImage((image + 1) % displayedRecipe.images.length)
              }
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          {/* Ingredients */}
          <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
            Ingredients:
          </Typography>
          <ul>
            {displayedRecipe.ingredients.map((el, index) => (
              <li key={"ingredient-" + index}>{el}</li>
            ))}
          </ul>
        </Box>
      </Container>
    </Box>
  );
}

export default DirectionsView;
