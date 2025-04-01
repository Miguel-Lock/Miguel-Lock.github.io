"use client";

import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
import { useRecipes } from "@/context/RecipeContext";
import { useEffect, useState } from "react";

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

export function FeaturedRecipeCard() {
  const router = useRouter();
  const { getRecipeById, recipes } = useRecipes();
  const [recipeOfTheDay, setRecipeOfTheDay] = useState<Recipe | null>(null);

  useEffect(() => {
    const currentDate = new Date();
    const recipeIndex =
      currentDate.getDay() * currentDate.getMonth() +
      ((1 * currentDate.getFullYear()) % 80) +
      1;

    let recipe = getRecipeById(recipeIndex);

    if (!recipe) {
      const fallbackIndex = currentDate.getDate() % recipes.length;
      recipe = recipes[fallbackIndex];
    }

    setRecipeOfTheDay(recipe || null);
  }, [getRecipeById, recipes]);

  if (!recipeOfTheDay) {
    return (
      <Card sx={{ marginTop: "20px", padding: "16px", boxShadow: 3 }}>
        <Typography>Loading featured recipe...</Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        display: "flex",
        marginTop: "20px",
        padding: "16px",
        boxShadow: 3,
        cursor: "pointer",
      }}
      onClick={() => {
        router.push(routes.directions(recipeOfTheDay.id));
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 200, borderRadius: "10px" }}
        image={"/image_files/" + recipeOfTheDay.images[0]}
        alt={recipeOfTheDay.name}
      />
      <CardContent>
        <Typography variant="h5">{recipeOfTheDay.name}</Typography>
        <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
          <Chip
            label={recipeOfTheDay.prep_time}
            sx={{ bgcolor: "primary.main" }}
          />
          <Chip
            label={recipeOfTheDay.category}
            sx={{ bgcolor: "primary.main" }}
          />
          <Chip
            label={recipeOfTheDay.cuisine}
            sx={{ bgcolor: "primary.main" }}
          />
          <Chip
            label={recipeOfTheDay.difficulty}
            sx={{ bgcolor: "primary.main" }}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            marginTop: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {recipeOfTheDay.story}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FeaturedRecipeCard;
