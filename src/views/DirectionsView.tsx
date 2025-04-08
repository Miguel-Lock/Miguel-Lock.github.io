"use client";
import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  Button,
  IconButton,
  CardMedia,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRecipes } from "@/context/RecipeContext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
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

export function DirectionsView({ recipeID }: { recipeID: number }) {
  const { recipes } = useRecipes();
  const { toggleFavorite, isFavorite } = useFavorites();
  const displayedRecipe: Recipe = recipes.filter(
    (recipe) => recipe.id === recipeID
  )[0];

  const [image, setImage] = useState(0);
  const [readMore, setReadMore] = useState(false);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {/* About Section */}
      <Grid
        size={{ xs: 12, sm: 6, md: 7, lg: 8 }}
        sx={{ p: { xs: 2, sm: 3, md: 6, lg: 8 } }}
      >
        {/* Recipe display and story */}
        <Typography variant="h3" fontWeight="bold">
          {displayedRecipe.name}
          <IconButton
            sx={{
              color: "text.primary",
              ml: 1,
            }}
            onClick={() => toggleFavorite(recipeID)}
          >
            {isFavorite(recipeID) ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Typography>

        {/* Tags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginY: 2 }}>
          <InfoChip label={displayedRecipe.prep_time} />
          <InfoChip label={displayedRecipe.category} />
          <InfoChip label={displayedRecipe.cuisine} />
          <InfoChip label={displayedRecipe.difficulty} />
          {displayedRecipe.dietary.map((restriction, index) => {
            return <InfoChip label={restriction} key={"dietary-" + index} />;
          })}
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
        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            size="small"
            sx={{ marginTop: 1, bgcolor: "primary.light" }}
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "READ LESS" : "READ MORE"}
          </Button>
        </Box>

        {/* Directions */}
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Directions:
          </Typography>
          <Typography component="ol">
            {displayedRecipe.steps.map((step, index) => (
              <li key={"step-" + index}>{step}</li>
            ))}
          </Typography>
        </Box>
      </Grid>
      {/* Directions Section */}
      <Grid
        size={{ xs: 12, sm: 6, md: 5, lg: 4 }}
        sx={{ bgcolor: "primary.light", p: { xs: 2, sm: 3, md: 6, lg: 8 } }}
      >
        <Box sx={{ margin: "auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
            }}
          >
            <IconButton
              sx={{ mr: 1 }}
              onClick={() =>
                setImage(
                  (image + displayedRecipe.images.length - 1) %
                    displayedRecipe.images.length
                )
              }
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <Card sx={{ flex: 1 }}>
              <CardMedia
                component="img"
                image={"/image_files/" + displayedRecipe.images[image]}
                alt={displayedRecipe.name}
                sx={{ objectFit: "cover" }}
              />
            </Card>

            <IconButton
              sx={{ ml: 1 }}
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

          <FormGroup>
            {displayedRecipe.ingredients.map((el, index) => {
              return (
                <FormControlLabel
                  key={"ingredient-" + index}
                  control={<Checkbox />}
                  label={el}
                />
              );
            })}
          </FormGroup>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DirectionsView;
