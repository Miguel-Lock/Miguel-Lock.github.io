"use client";
import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Card,
  Button,
  IconButton,
  CardMedia,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
    <Box>
      {/* Main Content */}
      <Container
        sx={{
          display: "flex",
          marginTop: 4,
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        {/* Recipe display and story */}
        <Box
          sx={{
            flex: 2,
            width: { xs: "100%" },
            pr: { md: "500px", xl: "300px" },
          }}
        >
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
          <Button
            variant="contained"
            size="small"
            sx={{ marginY: 2, maxWidth: "120px", color: "text.secondary" }}
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "READ LESS" : "READ MORE"}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
          }}
        >
          {/* This is the picture box */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "primary.light",
              p: 2,
              mb: 3,
              borderRadius: 2,
              justifyItems: "center",
              maxWidth: "400px",
              order: { xs: 2, md: 3 },
              right: { md: "25px", xl: "75px" },
              position: { md: "absolute" },
              top: "100px",
            }}
          >
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia
                component="img"
                image={"/image_files/" + displayedRecipe.images[image]}
                alt={displayedRecipe.name}
                sx={{ objectFit: "cover", maxWidth: "345px" }}
              />
            </Card>
            <Box sx={{ justifyContent: "center", alignItems: "center" }}>
              <IconButton
                onClick={() =>
                  setImage(
                    (image + displayedRecipe.images.length - 1) %
                      displayedRecipe.images.length
                  )
                }
                sx={{ mr: 5 }}
              >
                <ArrowBackIosIcon sx={{ color: "text.primary" }} />
              </IconButton>

              <IconButton
                onClick={() =>
                  setImage((image + 1) % displayedRecipe.images.length)
                }
              >
                <ArrowForwardIosIcon sx={{ color: "text.primary" }} />
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
                    control={<Checkbox sx={{ color: "text.primary" }} />}
                    label={el}
                  />
                );
              })}
            </FormGroup>
          </Box>

          {/* Directions */}
          <Box
            sx={{
              flex: 1,
              order: { xs: 3, md: 2 },
              width: { xs: "100%" },
              pr: { md: "500px", xl: "300px" },
              mb: { md: 30 },
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Directions:
            </Typography>
            <Typography component="ol" sx={{ mt: 1, mb: 5 }}>
              {displayedRecipe.steps.map((step, index) => (
                <li key={"step-" + index}>{step}</li>
              ))}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default DirectionsView;
