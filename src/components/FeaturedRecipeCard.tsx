"use client";

import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
} from "@mui/material";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";

const recipes = [
  {
    title: "Caprese Skewers",
    time: "10 Min",
    category: "Italian",
    type: "Appetizer",
    difficulty: "Easy",
    description:
      "Caprese Skewers are one of my favorite appetizers because they combine the classic flavors of Italy with a modern, playful presentation...",
    image: "Caprese-Skewers.png",
  },
];

export function FeaturedRecipeCard() {
  const router = useRouter();

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
        router.push(routes.directions);
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 200, borderRadius: "10px" }}
        image={recipes[0].image}
        alt="Caprese Skewers"
      />
      <CardContent>
        <Typography variant="h5">{recipes[0].title}</Typography>
        <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
          <Chip label={recipes[0].time} sx={{ bgcolor: "primary.main" }} />
          <Chip label={recipes[0].category} sx={{ bgcolor: "primary.main" }} />
          <Chip label={recipes[0].type} sx={{ bgcolor: "primary.main" }} />
          <Chip
            label={recipes[0].difficulty}
            sx={{ bgcolor: "primary.main" }}
          />
        </Box>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          {recipes[0].description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FeaturedRecipeCard;
