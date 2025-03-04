"use client";

import React from "react";
import { Typography, Box } from "@mui/material";
import AppHeader from "@/components/AppHeader";

export function RecipesView() {
  return (
    <Box>
      {/* Navbar */}
      <AppHeader />

      <Typography>This will show all the recipes</Typography>
    </Box>
  );
}
