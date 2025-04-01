"use client";

import React from "react";
import { Typography, Card, CardContent, CardMedia, Chip } from "@mui/material";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";

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

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();

  const storyPreview = recipe.story.substring(0, 200) + "...";

  return (
    <Card
      sx={{
        boxShadow: 2,
        borderRadius: "10px",
        cursor: "pointer",
        minHeight: 400,
      }}
      onClick={() => {
        router.push(routes.directions);
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={"/image_files/" + recipe.images[0]}
        alt={recipe.name}
      />
      <CardContent>
        <Typography variant="h6">{recipe.name}</Typography>
        <Typography variant="body2">{storyPreview}</Typography>
        <Chip
          label={recipe.prep_time}
          sx={{ bgcolor: "primary.main", my: 2, mr: 1 }}
        />
        <Chip
          label={recipe.difficulty}
          sx={{ bgcolor: "primary.main", my: 2 }}
        />
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
