"use client";

import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
} from "@mui/material";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import InfoChip from "@/components/InfoChip";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
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

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();
  const theme = useTheme();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <Card
      sx={{
        boxShadow: `0 0 4px ${theme.palette.secondary.main}`,
        borderRadius: "10px",
        cursor: "pointer",
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
      <CardContent sx={{ paddingBottom: "16px !important" }}>
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

        <Box
          style={{
            margin: "16px 0 0 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InfoChip label={recipe.prep_time} />
          <IconButton
            sx={{ color: "text.primary" }}
            onClick={(e: React.MouseEvent<unknown>) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(recipe.id);
            }}
          >
            {isFavorite(recipe.id) ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
