"use client";

import React from "react";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import InfoChip from "@/components/InfoChip";

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
  const theme = useTheme();

  return (
    <Card
      sx={{
        boxShadow: `0 0 4px ${theme.palette.secondary.main}`,
        borderRadius: "10px",
        cursor: "pointer",
        minHeight: 400,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 0 15px ${theme.palette.secondary.main}`,
        },
      }}
      onClick={() => {
        router.push(routes.directions(recipe.id));
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

        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "5",
            WebkitBoxOrient: "vertical",
          }}
        >
          {recipe.story}
        </Typography>

        <div style={{ margin: "16px 0" }}>
          <span style={{ marginRight: "8px" }}>
            <InfoChip label={recipe.prep_time} />
          </span>
          <InfoChip label={recipe.difficulty} />
        </div>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
