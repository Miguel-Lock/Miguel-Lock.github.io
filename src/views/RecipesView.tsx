"use client";

import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import AppHeader from "@/components/AppHeader";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const recipes = [
  {
    title: "Caprese Skewers",
    time: "10 Min",
    category: "Italian",
    type: "Appetizer",
    difficulty: "Easy",
    description:
      "Caprese Skewers are one of my favorite appetizers because they combine the classic flavors of Italy with a modern, playful presentation...",
    image: "Caprese-Skewers.png", // Replace with actual image
  },

  {
    title: "Caprese Skewers",
    time: "10 Min",
    category: "Italian",
    type: "Appetizer",
    difficulty: "Easy",
    description:
      "Caprese Skewers are one of my favorite appetizers because they combine the classic flavors of Italy with a modern, playful presentation...",
    image: "Caprese-Skewers.png", // Replace with actual image
  },
  {
    title: "Caprese Skewers",
    time: "10 Min",
    category: "Italian",
    type: "Appetizer",
    difficulty: "Easy",
    description:
      "Caprese Skewers are one of my favorite appetizers because they combine the classic flavors of Italy with a modern, playful presentation...",
    image: "Caprese-Skewers.png", // Replace with actual image
  },

  {
    title: "Caprese Skewers",
    time: "10 Min",
    category: "Italian",
    type: "Appetizer",
    difficulty: "Easy",
    description:
      "Caprese Skewers are one of my favorite appetizers because they combine the classic flavors of Italy with a modern, playful presentation...",
    image: "Caprese-Skewers.png", // Replace with actual image
  },

  {
    title: "Caprese Skewers",
    time: "10 Min",
    category: "Italian",
    type: "Appetizer",
    difficulty: "Easy",
    description:
      "Caprese Skewers are one of my favorite appetizers because they combine the classic flavors of Italy with a modern, playful presentation...",
    image: "Caprese-Skewers.png", // Replace with actual image
  },

  {
    title: "Caprese Skewers",
    time: "10 Min",
    category: "Italian",
    type: "Appetizer",
    difficulty: "Easy",
    description:
      "Caprese Skewers are one of my favorite appetizers because they combine the classic flavors of Italy with a modern, playful presentation...",
    image: "Caprese-Skewers.png", // Replace with actual image
  },
  // Duplicate for additional recipe cards
];

export function RecipesView() {
  const router = useRouter();

  return (
    <Box>
      {/* Navbar */}
      <AppHeader />

      <Container>
        {/* All Recipes Section */}
        <Box sx={{ padding: "20px" }}>
          <Typography variant="h4">All Recipes</Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "20px",
            }}
          >
            <TextField
              placeholder="Search Recipes"
              variant="outlined"
              sx={{ width: "300px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <FilterListIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Recipe Grid */}
          <Grid container spacing={3}>
            {recipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                    <Typography variant="body2">
                      Nihilnihil eos in nobis odio rem. Quosvit vitae illo,
                      dolor, sed dolores...
                    </Typography>
                    <Chip
                      label={recipes[0].time}
                      sx={{ bgcolor: "primary.main", my: 2 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
