import React from "react";
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

const sampleRecipe = {
  title: "Caprese Skewers",
  time: "10 Min",
  category: "Italian",
  type: "Appetizer",
  difficulty: "Easy",
  description:
    "Caprese Skewers are one of my favorite appetizers because they combine the classic flavors of Italy with a modern, playful presentation...",
  ingredients: [
    "Mozerella Balls",
    "Basil",
    "Small Tomatoes",
    "Balsamic Vinegar",
  ],
  steps: [
    "On small skewers, thread a cherry tomato, a basil leaf, and a mozzarella ball.",
    "Repeat until all ingredients are used.",
    "Drizzle the skewers with olive oil and balsamic glaze.",
    "Serve immediately.",
  ],
  image: "Caprese-Skewers.png", // Replace with actual image
};

export function DirectionsView() {
  return (
    <Box>
      {/* Header */}
      <AppHeader />

      {/* Main Content */}
      <Container sx={{ display: "flex", marginTop: 4 }}>
        {/* Left Section */}
        <Box flex={2} sx={{ paddingRight: 4 }}>
          <Typography variant="h3" fontWeight="bold">
            {sampleRecipe.title} <FavoriteBorderIcon fontSize="small" />
          </Typography>

          {/* Tags */}
          <Box sx={{ display: "flex", gap: 1, marginY: 2 }}>
            <Chip
              label={sampleRecipe.time}
              variant="outlined"
              sx={{ bgcolor: "primary.main" }}
            />
            <Chip
              label={sampleRecipe.category}
              variant="outlined"
              sx={{ bgcolor: "primary.main" }}
            />
            <Chip
              label={sampleRecipe.type}
              variant="outlined"
              sx={{ bgcolor: "primary.main" }}
            />
            <Chip
              label={sampleRecipe.difficulty}
              variant="outlined"
              sx={{ bgcolor: "primary.main" }}
            />
          </Box>

          {/* Description */}
          <Typography>{sampleRecipe.description}</Typography>
          <Button variant="contained" sx={{ marginY: 2 }}>
            Read More
          </Button>

          {/* Directions */}
          <Typography variant="h5" fontWeight="bold">
            Directions:
          </Typography>
          <Typography component="ol">
            {sampleRecipe.steps.map((step, index) => (
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
            <IconButton>
              <ArrowBackIosIcon />
            </IconButton>

            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <img
                src={sampleRecipe.image}
                alt="Caprese Skewers"
                style={{ width: "100%" }}
              />
            </Card>

            <IconButton>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          {/* Ingredients */}
          <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
            Ingredients:
          </Typography>
          <ul>
            {sampleRecipe.ingredients.map((el, index) => (
              <li key={"ingredient-" + index}>{el}</li>
            ))}
          </ul>
        </Box>
      </Container>
    </Box>
  );
}

export default DirectionsView;
