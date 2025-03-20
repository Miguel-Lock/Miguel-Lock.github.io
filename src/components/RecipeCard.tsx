"use client";

import React from "react";
import { Typography, Card, CardContent, CardMedia, Chip } from "@mui/material";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";

interface Recipe {
  title: string;
  time: string;
  category: string;
  type: string;
  difficulty: string;
  description: string;
  image: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();

  return (
    <Card
      sx={{ boxShadow: 2, borderRadius: "10px", cursor: "pointer" }}
      onClick={() => {
        router.push(routes.directions);
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={recipe.image}
        alt={recipe.title}
      />
      <CardContent>
        <Typography variant="h6">{recipe.title}</Typography>
        <Typography variant="body2">{recipe.description}</Typography>
        <Chip label={recipe.time} sx={{ bgcolor: "primary.main", my: 2 }} />
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
