"use client";

import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  //  Chip,
  IconButton,
} from "@mui/material";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
import { useRecipes } from "@/context/RecipeContext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import InfoChip from "@/components/InfoChip";
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

export function FeaturedRecipeCard() {
  const router = useRouter();
  const theme = useTheme();
  const { toggleFavorite, isFavorite } = useFavorites();
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
        flexDirection: { xs: "column", sm: "row" },
        marginTop: "20px",
        padding: "16px",
        bgcolor: "primary.light",
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
        router.push(routes.directions(recipeOfTheDay.id));
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: "100%", sm: 200 },
          height: { xs: 200, sm: "auto" },
          objectFit: "cover",
          borderRadius: "10px",
        }}
        image={"/image_files/" + recipeOfTheDay.images[0]}
        alt={recipeOfTheDay.name}
      />
      <CardContent>
        <Typography variant="h5">
          {recipeOfTheDay.name}
          <IconButton
            sx={{
              color: "text.primary",
              ml: 1,
            }}
            onClick={(e: React.MouseEvent<unknown>) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(recipeOfTheDay.id);
            }}
          >
            {isFavorite(recipeOfTheDay.id) ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            marginTop: 1,
            flexWrap: "wrap",
          }}
        >
          <InfoChip label={recipeOfTheDay.prep_time} />
          <InfoChip label={recipeOfTheDay.category} />
          <InfoChip label={recipeOfTheDay.cuisine} />
          <InfoChip label={recipeOfTheDay.difficulty} />
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
